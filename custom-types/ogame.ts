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
    upgrade_methods: UpgradeMethods;
}
export interface UpgradeCosts {
    metal: BigNumberish;
    crystal: BigNumberish;
    deuterium: BigNumberish;
}
export interface UpgradeMethods {
    start: string;
    complete: string;
}
