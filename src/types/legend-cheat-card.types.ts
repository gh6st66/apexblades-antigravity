/**
 * Legend Cheat Card Types
 * Single-screen ranked cheat cards optimized for quick decision-making
 * with poor comms and third-party pressure.
 */

export type RoleType = 'Entry' | 'Anchor' | 'Flex' | 'Support' | 'Info' | 'Macro';

export type WinCondition =
    | 'KP Conversion'
    | 'Placement'
    | 'Zone Control'
    | 'Rotations'
    | 'Team Enabler';

export type TerrainType =
    | 'height'
    | 'indoors'
    | 'edge'
    | 'zone_center'
    | 'natural_cover'
    | 'open_sightlines';

export type FightDistance =
    | 'close'
    | 'mid'
    | 'long'
    | 'close-mid'
    | 'mid-long'
    | 'flexible';

export type TacticalUse =
    | 'initiate'
    | 'deny'
    | 'escape'
    | 'info'
    | 'damage'
    | 'zone';

export type TimingRule =
    | 'early'
    | 'mid-fight'
    | 'reactionary'
    | 'pre-emptive'
    | 'cooldown-dependent';

export type UltUseCase =
    | 'rotate'
    | 'reset'
    | 'wipe'
    | 'zone'
    | 'escape'
    | 'initiate'
    | 'third-party';

export interface LegendInfo {
    name: string;
    role_type: RoleType;
    primary_win_condition: WinCondition;
    season_version?: string;
}

export interface RoleDefinition {
    responsibility: string;
    lead_when: string;
    follow_when: string;
    disengage_when: string;
}

export interface Positioning {
    preferred_terrain: TerrainType[];
    fight_distance: FightDistance;
    commit_vs_hold: string;
}

export interface PassiveAbility {
    name?: string;
    leverage_when: string;
    do_not_rely_on: string;
}

export interface TacticalAbility {
    name?: string;
    primary_use: TacticalUse;
    timing_rule: TimingRule;
    notes?: string;
}

export interface UltimateAbility {
    name?: string;
    best_use_cases: UltUseCase[];
    do_not_use_when: string;
    abort_conditions: string;
    cooldown_seconds?: number;
}

export interface Abilities {
    passive: PassiveAbility;
    tactical: TacticalAbility;
    ultimate: UltimateAbility;
}

export interface FightFlow {
    start: string;
    mid_fight: string;
    exit_reset: string;
}

export interface Rotations {
    early_game: string;
    mid_game: string;
    late_game: string;
    bad_rotation: string;
}

export interface WeaponRecommendation {
    weapon: string;
    reason: string;
}

export interface Weapons {
    primary: WeaponRecommendation;
    secondary: WeaponRecommendation;
    avoid?: string[];
}

export interface MapOverride {
    map: string;
    poi?: string;
    height_rules?: string;
    ult_timing?: string;
    danger_zones?: string[];
}

export interface LegendCheatCard {
    legend: LegendInfo;
    role: RoleDefinition;
    positioning: Positioning;
    abilities: Abilities;
    fight_flow: FightFlow;
    rotations: Rotations;
    weapons: Weapons;
    common_mistakes: string[];
    rp_loss_behavior?: string;
    mental_rule: string;
    map_overrides?: MapOverride[];
}

/**
 * Utility type for partial updates during card creation
 */
export type PartialCheatCard = Partial<LegendCheatCard> & Pick<LegendCheatCard, 'legend'>;

/**
 * Map of all legend cheat cards indexed by legend name
 */
export type CheatCardRegistry = Record<string, LegendCheatCard>;
