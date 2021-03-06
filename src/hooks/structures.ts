import { useStarknetCall, useStarknetTransactionManager } from "@starknet-react/core";
import { useOgameContract } from "src/hooks/ogame";
import { toBN } from "starknet/dist/utils/number";
import { BigNumberish } from "starknet/dist/utils/number";
import { Structure } from "src/custom-types/ogame";
import dayjs from "dayjs";
import { namedConsoleLog } from "src/lib/helper";
import { useEffect } from "react";

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

export const useStructures = (account: string) => {

    // refresh data on transactions updates
    const { transactions } = useStarknetTransactionManager();
    useEffect(() => {
        console.log("Refresh Structures");
        refreshStructuresLevels();
        refreshStructuresUpgradeCost();
        refreshBuildStatus();
    }, [transactions]);

    const { contract: ogame } = useOgameContract();

    // get_structures_levels 
    const {
        data: dataStructuresLevels,
        loading: loadingStructuresLevels,
        error: errorStructuresLevels,
        refresh: refreshStructuresLevels } =
        useStarknetCall({
            contract: ogame,
            method: 'get_structures_levels',
            args: account ? [account] : undefined,
        });

    // get upgrade status
    const { data, loading, error, refresh: refreshBuildStatus } = useStarknetCall({
        contract: ogame,
        method: 'build_time_completion',
        args: account ? [account] : undefined,
    })
    let buildingID: BigNumberish = data?.[0] ? toBN(data?.[0]) : undefined;
    let buildTime = data?.[1] ? dayjs.unix(toBN(data?.[1]).toString(10)) : undefined;

    // get_structures_upgrade_cost
    const {
        data: dataStructuresUpgradeCost,
        loading: loadingStructuresUpgradeCost,
        error: errorStructuresUpgradeCost,
        refresh: refreshStructuresUpgradeCost } =
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
            isUpgrading: buildingID?.toNumber() === i + 1,
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

    return [dataStructures, isUpgradingAny, buildTime] as const;
};
