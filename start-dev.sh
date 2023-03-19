#!/usr/bin/env bash
# CONTRIBUTING: Please test this script on bash 3.2 if you introduce new changes

set -euo pipefail

# Options
ROQ_ONE_DEV_KEEP_SERVICES_ENV="${ROQ_ONE_DEV_KEEP_SERVICES_ENV:-false}"
ROQ_ONE_DEV_KEEP_VOLUMES="${ROQ_ONE_DEV_KEEP_VOLUMES:-false}"

# Globals
ALL_LOG="/tmp/roq-one-dev-all.log"
DOCKER_CHILD_PID=
TMUX_WINDOW_INDEX=
LAUNCH_SERVICE_TMUX_READY=
LAUNCH_SERVICE_SUBSHELLS=()
LOOP_SERVICE=
LOOP_FILE_LOG=

main() {
  set -m

  echo "Starting ROQ One!"
  echo "ROQ_ONE_DEV_KEEP_SERVICES_ENV=${ROQ_ONE_DEV_KEEP_SERVICES_ENV}"
  echo "ROQ_ONE_DEV_KEEP_VOLUMES=${ROQ_ONE_DEV_KEEP_VOLUMES}"
  echo

  rm "${ALL_LOG}" 2> /dev/null || true

  echo "Launching docker containers and sending them to the background"
  {
    cd backend
    docker-compose down $([[ "${ROQ_ONE_DEV_KEEP_VOLUMES}" != "true" ]] && echo "-v")
    docker-compose up
  } &
  DOCKER_CHILD_PID=$!

  if [[ "${TMUX:-}" == "" ]] ; then
    local launch_service=launch_service_subshell
    local cleanup_services=cleanup_services_subshell
  else
    local launch_service=launch_service_tmux
    local cleanup_services=cleanup_services_tmux
  fi

  trap "${cleanup_services}" SIGINT EXIT

  prepare_service "frontend" "${ROQ_ONE_DEV_KEEP_SERVICES_ENV}"
  prepare_service "backend" "${ROQ_ONE_DEV_KEEP_SERVICES_ENV}"

  $launch_service "frontend"
  $launch_service "backend"

  fg
}

prepare_service() {
  local service="${1}"
  local keep_env="${2}"
  if [[ "${keep_env}" == "true" ]] ; then return ; fi
  echo "Environment for service '${service}' has been copied from .env.dev"
  pushd "${service}" > /dev/null 2>&1
  cp .env.dev .env
  popd > /dev/null 2>&1
}

start_frontend() {
  rm -rf .next
  npm install || return
  npm run dev
}

start_backend() {
  rm -rf dist
  npm install || return
  npm run migration:local:config || return
  npm run migration:local:run || return
  npm run import:dev || return
  npm run start:dev
}

launch_service_tmux() {
  local service="${1}"
  if [[ "${LAUNCH_SERVICE_TMUX_READY}" != "true" ]] ; then
    echo "Preparing TMUX"
    LAUNCH_SERVICE_TMUX_READY="true"
    TMUX_WINDOW_INDEX="$(tmux display-message -p '#I')"
    tmux select-pane -T "docker-compose up" -t :${TMUX_WINDOW_INDEX}
    tmux set-option -w -t :${TMUX_WINDOW_INDEX} pane-border-status top
  fi
  echo "Running ROQ One ${service}"
  tmux split-window -t :${TMUX_WINDOW_INDEX} bash -c "source ${BASH_SOURCE[0]} && loop ${service}"
  tmux select-layout -t :${TMUX_WINDOW_INDEX} tiled
}

launch_service_subshell() {
  local service="${1}"
  bash -c "source ${BASH_SOURCE[0]} && loop ${service}" &
  local child_pid=$!
  LAUNCH_SERVICE_SUBSHELLS+=("${child_pid}")
}

cleanup_services_subshell() {
  echo "Killing ${LAUNCH_SERVICE_SUBSHELLS[@]}..."
  for pid in "${LAUNCH_SERVICE_SUBSHELLS[@]}" ; do
    kill -- -${pid} 2> /dev/null || true
  done
  cleanup_docker
  echo "Tip: Run 'start-dev.sh' inside 'tmux' for improved functionality."
}

cleanup_services_tmux() {
  echo "Killing all TMUX Panels..."
  tmux kill-pane -a -t :${TMUX_WINDOW_INDEX} 2> /dev/null || true
  cleanup_docker
}

cleanup_docker() {
  kill -9 -"${DOCKER_CHILD_PID}" 2> /dev/null || true
}

loop() {
  LOOP_SERVICE="${1}"
  LOOP_FILE_LOG=/tmp/roq-one-dev-${LOOP_SERVICE}.log
  printf '\033]2;%s\033\\' "${LOOP_SERVICE}"  # Names the Panel
  cd "${LOOP_SERVICE}"
  while true ; do
    set +e
    "start_${LOOP_SERVICE}" 2>&1 | while read line ; do log "${line}" ; done
    set -e
    log "Trying again in 5 seconds..."
    sleep 5
  done
}

log() {
  if [[ "${1}" =~ $'\033[2J' ]] || [[ "${1}" =~ $'\033[H' ]] || [[ "${1}" =~ $'\033c' ]] ; then return ; fi  # Trims out clear screen characters
  echo "${1}" >> "${LOOP_FILE_LOG}"
  echo -e "\e[3;33m${LOOP_SERVICE}|\e[0m ${1}" >> "${ALL_LOG}"
  if [[ "${TMUX:-}" == "" ]] ; then
    echo -e "\e[3;33m${LOOP_SERVICE}|\e[0m ${1}"
  else
    echo "${1}"
  fi
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]] ; then
  main
fi
