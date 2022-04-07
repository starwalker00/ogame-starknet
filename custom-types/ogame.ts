import { BigNumberish } from "starknet/dist/utils/number";

// resource
export const Resource = {
    Metal: "METAL",
    Crystal: "CRYSTAL",
    Deuterium: "DEUTERIUM",
    Energy: "ENERGY",
} as const;

// structure
export interface Structure {
    name: string;
    level: BigNumberish;
    upgrade_costs: UpgradeCosts;
}
export interface UpgradeCosts {
    metal: BigNumberish;
    crystal: BigNumberish;
    deuterium: BigNumberish;
}
