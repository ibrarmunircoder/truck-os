export const dev = {
  appName: "truckos",
  env: {
    region: "eu-west-1",
    account: "696448812249",
  },
  workspace: "dev",
  gitlab: {
    minCapacity: 1,
    maxCapacity: 4,
  },
  apps: {
    frontendReplicaCount: 1,
    backendReplicaCount: 1,
  },
} as const;

export const prod = {
  appName: "truckos",
  env: {
    region: "eu-west-1",
    account: "717435102727",
  },
  workspace: "prod",
  apps: {
    frontendReplicaCount: 1,
    backendReplicaCount: 1,
  },
} as const;
