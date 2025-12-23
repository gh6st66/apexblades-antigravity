# Season 27 "Amped" Dataset (Markdown Wrapper)

```json
{
  "season_info": {
    "season_number": 27,
    "season_name": "Amped",
    "season_code": "S27",
    "season_version": "S27_Amped_Launch",
    "release_date_utc": "2025-11-04T18:00:00Z",
    "season_duration_estimate_days": "TBD",
    "build_version": "TBD",
    "official_patch_notes_url": "https://www.ea.com/games/apex-legends/apex-legends/news/amped-patch-notes",
    "br_map_pool": [
      "Olympus",
      "Broken Moon",
      "World's Edge"
    ],
    "notes": "Season 27 Amped introduces a major Valkyrie, Rampart and Horizon rework, global Mantle Boost movement, Tridents 2.0, Ranked KP and Ladder changes, and a frozen Olympus rework."
  },
  "legends": [
    {
      "name": "Valkyrie",
      "season_version": "S27_Amped_Launch",
      "tactical": {
        "name": "Missile Swarm",
        "description": "Fire a cluster of mini-rockets that damage and disorient enemies; on hit they now briefly reveal enemies and suppress movement passives.",
        "cooldown": 25,
        "mechanics": "Fires a grid of rockets at a targeted area. No longer deals self-damage or self-stun. On hit, applies a ~1.5s full-body scan and temporarily disables movement passives like Mantle Boost and similar perks. Vertical clearance restriction removed; improved pathing for low ceilings and under-structure shots; max range increased to ~125m.",
        "tech": [
          "Can be fired while skydiving (except from dropship).",
          "Use EMP-style passive suppression to cancel Mantle Boost- or jet-based engages.",
          "Combo with Skyward Dive repositions to immediately scan a third-party fight."
        ]
      },
      "passive": {
        "name": "VTOL Jets",
        "description": "Jetpack with directional control and fuel management. In S27 it refuels much faster, flies faster, but has reduced fuel capacity and no mid-air refuel until landing."
      },
      "ultimate": {
        "name": "Skyward Dive",
        "description": "Prepare for launch, then boost Valkyrie and nearby teammates into a redeploy skydive.",
        "cooldown": 150
      },
      "movement_profile": {
        "class": "Recon",
        "unique_movement_passives": [
          "VTOL Jets for sustained aerial movement with horizontal and vertical control.",
          "Mantle Boost (global S27 system) for momentum bursts after mantling.",
          "Improved airborne control during Skyward Dive and skydive phases (faster descent near ground)."
        ],
        "base_speed_type": "standard_non_fortified",
        "notes": "VTOL Jets now emphasize longer burns for travel speed; horizontal and vertical speeds significantly increased compared to pre-S27."
      },
      "hitbox_category": "standard_non_fortified",
      "interactions": [
        "Missile Swarm impact applies a brief full-body scan, similar to recon scans, and triggers movement-passive cooldowns like other EMP-type effects.",
        "EMP effects drain VTOL Jets fuel.",
        "Skyward Dive can now be combined with tactical firing while skydiving to scan squads during rotation."
      ],
      "known_tech": [
        "Jetpack strafe-peeking around cover with short burns.",
        "Skyward Dive tap-cancels to quickly reposition to nearby height (benefits from reduced pre-launch delay).",
        "Combining Mantle Boost into jetpack for extra burst when leaving high ground (exact timing windows TBD)."
      ],
      "patch_history": [
        {
          "season": "S27_Amped_Launch",
          "summary": "Major jetpack and tactical rework, buffs to ultimate and skydive usability.",
          "details": {
            "vtol_jets": {
              "recharge_delay_seconds_before": 8.0,
              "recharge_delay_seconds_after": 2.5,
              "recharge_time_seconds_before_approx": 10.9,
              "recharge_time_seconds_after": 3.0,
              "fuel_total_seconds_before": 8.0,
              "fuel_total_seconds_after": 6.0,
              "horizontal_speed": "significantly_increased",
              "vertical_speed": "increased_with_extra_vertical_when_flying_straight_up",
              "initial_boost_behavior": "first_0_5s changed from ~25_percent_faster_than_base to ~5_percent_slower_than_base",
              "fuel_regen_condition": "no_refuel_until_ground_contact"
            },
            "missile_swarm": {
              "self_damage": "removed",
              "self_stun": "removed",
              "scan_on_hit_seconds": 1.5,
              "movement_passive_cooldown_on_hit": true,
              "cooldown_seconds_before": 30,
              "cooldown_seconds_after": 25,
              "max_range_meters_before_approx": 100,
              "max_range_meters_after": 125,
              "vertical_clearance_restriction": "removed",
              "pathing_reliability": "improved_for_low_clearance_situations"
            },
            "skyward_dive": {
              "launch_height_change_percent": 15,
              "cooldown_seconds_before": 180,
              "cooldown_seconds_after": 150,
              "takeoff_delay_seconds_before": 2.0,
              "takeoff_delay_seconds_after": 1.5,
              "slow_rise_duration_seconds_before": 1.83,
              "slow_rise_duration_seconds_after": 1.33,
              "self_cancel_cooldown_penalty": "removed",
              "damage_cooldown_penalty_seconds_before": 54,
              "damage_cooldown_penalty_seconds_after": 30
            },
            "skydive": {
              "tactical_usable_while_skydiving": true,
              "exception": "cannot_use_from_dropship",
              "landing_behavior": "reduced_slow_fall_near_ground"
            },
            "upgrades": {
              "afterburners": "baseline_instead_of_upgrade",
              "eyes_in_the_sky_tier": "moved_to_level_2",
              "full_coverage_pattern_change": "3x5_to_4x5",
              "full_tank": "removed",
              "new_supersonic": "ultimate_launch_time_reduced_approx_50_percent",
              "reworked_aerial_expert": "boosts_horizontal_speed_and_handling_while_reducing_initial_fuel_cost_and_total_fuel_slightly"
            }
          }
        }
      ],
      "recommended_loadouts": [
        {
          "context": "Ranked Olympus / Broken Moon rotations",
          "weapons": [
            "Alternator SMG (Gold or with Double Tap Trigger)",
            "Bocek Compound Bow or G7 Scout"
          ],
          "notes": "Leverage Alternator’s S27 buff and Double Tap for close/mid fights; pair with a marksman/bow to punish from Valk jet angles. Values derived from S27 weapon tier lists and meta reports; exact DPS/TTK still TBD."
        }
      ]
    }
    // ... (other legends and data omitted for brevity)
  ]
}
```

*File generated on 2025-12-07.*
