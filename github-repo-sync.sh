#!/bin/bash
#
# GitHub Repository Sync:
#   The goal of this script is to copy the files from this source repository to the target one, and commit them.
#   During this process some files will be omitted such as bitbucket-pipelines.yml, cloudbuild.yaml, etc...
#   Also notice that the git history from this source repository will not be leaked to the target repository.
#
#  >> Input variables:
#     - GIT_CLONE_SYNC_TARGET: Target repository where changes should be pushed.
#                              It should be of the form 'https://<<user>>:<<personal-access-token>>@<<repository_url>>'
#           [Use Cases]
#             * GitHub ROQ One repository as target: https://roqtech-bot:<<personal-access-token>>@github.com/roqtech/roq-one.git
#             * Test repository to test this script: https://roqtech-bot:<<personal-access-token>>@github.com/roqtech-bot/test.git
#
#     - TARGET_BRANCH: Target branch for the target repository specified at `GIT_CLONE_SYNC_TARGET`. It must exist beforehand.
#
#     - COMMIT_MESSAGE: The message that should appear on the commit of the target repository.
#
set -euo pipefail

git config --global user.name "ROQ"
git config --global user.email "website@roq.tech"
TMP_DIR=$(mktemp -d)
GIT_FOLDER_DIR=$(mktemp -d)

git clone --branch "${TARGET_BRANCH}" "${GIT_CLONE_SYNC_TARGET}" "${TMP_DIR}"

mv "${TMP_DIR}/.git" "${GIT_FOLDER_DIR}/.git"
rm -rf "${TMP_DIR}"/* # Removes all non-hidden files and folders from the target
rm -f "${TMP_DIR}"/.* # Removes hidden files but not the hidden folders from the target
mv "${GIT_FOLDER_DIR}/.git" "${TMP_DIR}/.git"
cp -r * "${TMP_DIR}/" # Copies all non-hidden files and folders from the source to the target
cp .* "${TMP_DIR}/"   # Copies all hidden files from the source (but not the hidden folders) to the target

cd "${TMP_DIR}/"
rm -rf bitbucket-pipelines.yml start-dev.sh github-repo-sync.sh container backend/cloudbuild.yaml frontend/cloudbuild.yaml
git add .
git commit -m "${COMMIT_MESSAGE}"
git push origin "${TARGET_BRANCH}" -f
