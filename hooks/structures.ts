import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useOgameContract } from "./ogame";
import { toBN } from "starknet/dist/utils/number";
import { Structure } from "@custom-types/ogame";

const baseLabel = ['metal', 'crystal', 'deuterium', 'solar_plant', 'robot_factory'];
const structuresLabel = ['metal_mine', 'crystal_mine', 'deuterium_mine', 'solar_plant', 'robot_factory'];

let dataStructures: Array<Structure> = new Array(structuresLabel.length)

export const useStructures = () => {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()

    // get_structures_levels 
    const {
        data: dataStructuresLevels,
        loading: loadingStructuresLevels,
        error: errorStructuresLevels } =
        useStarknetCall({
            contract: ogame,
            method: 'get_structures_levels',
            args: account ? [account] : undefined,
        });

    // get_structures_upgrade_cost
    const {
        data: dataStructuresUpgradeCost,
        loading: loadingStructuresUpgradeCost,
        error: errorStructuresUpgradeCost } =
        useStarknetCall({
            contract: ogame,
            method: 'get_structures_upgrade_cost',
            args: account ? [account] : undefined,
        });

    // fill object used as prop in components
    for (let i = 0; i < structuresLabel.length; i++) {
        let struct: Structure = {
            name: structuresLabel[i],
            level: dataStructuresLevels?.[i] ? toBN(dataStructuresLevels?.[i]) : undefined,
            upgrade_costs: {
                metal: dataStructuresUpgradeCost?.[i] ? toBN(dataStructuresUpgradeCost?.[i]?.metal) : undefined,
                crystal: dataStructuresUpgradeCost?.[i] ? toBN(dataStructuresUpgradeCost?.[i]?.crystal) : undefined,
                deuterium: dataStructuresUpgradeCost?.[i] ? toBN(dataStructuresUpgradeCost?.[i]?.deuterium) : undefined,
            },
            upgrade_methods: {
                start: baseLabel[i].concat("_upgrade_start"),
                complete: baseLabel[i].concat("_upgrade_complete"),
            }
        }
        dataStructures[i] = struct;
    }
    // console.log("dataStructures");
    // console.log(dataStructures);
    return [dataStructures];
};