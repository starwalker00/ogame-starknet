import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useOgameContract } from "./ogame";
import { toBN } from "starknet/dist/utils/number";
import { Structure } from "@custom-types/ogame";

const baseLabel = [
    'metal',
    'crystal',
    'deuterium',
    'solar_plant',
    'robot_factory'
];
const structuresLabel = [
    'metal_mine',
    'crystal_mine',
    'deuterium_mine',
    'solar_plant',
    'robot_factory'];
const structuresDescription = [
    "'The quick brown fox jumps over the lazy dog' is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    "'The quick brown fox jumps over the lazy dog' is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    "'The quick brown fox jumps over the lazy dog' is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    "'The quick brown fox jumps over the lazy dog' is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    "'The quick brown fox jumps over the lazy dog' is an English-language pangram—a sentence that contains all of the letters of the English alphabet."
];
const structuresImageSrc = [
    "https://via.placeholder.com/180",
    "https://via.placeholder.com/180",
    "https://via.placeholder.com/180",
    "https://via.placeholder.com/180",
    "https://via.placeholder.com/180"
];

let dataStructures: Structure[] = new Array(structuresLabel.length)

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

    // get upgrade status
    // const {
    //     data: dataIsUpgrading,
    //     loading: loadingIsUpgrading,
    //     error: errorIsUpgrading } =
    //     useStarknetCall({
    //         contract: ogame,
    //         method: '',
    //         args: account ? [account] : undefined,
    //     });

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
            description: structuresDescription[i],
            imageSrc: structuresImageSrc[i].concat("?text=").concat(structuresLabel[i]),
            level: dataStructuresLevels?.[i] ? toBN(dataStructuresLevels?.[i]) : undefined,
            isUpgrading: true,//TODO: get real value from view function
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

    // check if any structure is upgrading
    let isUpgradingValues: boolean[] = dataStructures.map((struct: Structure) => struct.isUpgrading);
    let isUpgradingAny: boolean = isUpgradingValues.reduce((acc: boolean, current: boolean) => acc || current);
    // console.log("isUpgradingAny");
    // console.log(isUpgradingAny);

    return [dataStructures, isUpgradingAny] as const;
};
