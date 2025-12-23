
================================================================================
PART 1: UPDATED SEASON 27 "AMPED" DATASET (USER PROVIDED)
Source: User Paste (Step 52)
================================================================================

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
    },
    {
      "name": "Rampart",
      "season_version": "S27_Amped_Launch",
      "tactical": {
        "name": "Amped Cover",
        "description": "Deploy a crouch-height wall that completes into full cover with an amped shield. In S27 walls gain a roof, scale with Evo level, and store damage to convert into a sprint speed boost.",
        "cooldown": "TBD",
        "mechanics": "Wall now includes a shield roof. Damage dealt through the amped shield or received by the wall charges it up. Stored charge (up to 300 damage) can be consumed by teammates vaulting over it, granting a sprint-only speed boost. Stored damage from hits to the wall counts at 25%, while bullets fired through the shield count at 100%. Wall health and shield health scale with Rampart’s Evo level.",
        "tech": [
          "Place walls early in fights to both block damage and bank a speed boost for rotation or chase.",
          "When a wall is destroyed, any stored charge automatically grants a speed boost to nearby teammates.",
          "Use walls to counterpeek sniper/marksman angles; stored charge rewards holding positions."
        ]
      },
      "passive": {
        "name": "Battle Modder",
        "description": "Upgraded version of Modded Loader. In addition to LMG/minigun mag and reload bonuses, Amped Cover walls gain permanent health increases as Rampart levels her Evo and gain extra shield health."
      },
      "ultimate": {
        "name": "Mobile Minigun 'Sheila'",
        "description": "Deploy or carry a powerful minigun for lane control and burst suppression.",
        "cooldown": "TBD"
      },
      "movement_profile": {
        "class": "Controller",
        "unique_movement_passives": [
          "Can use Ring Consoles to reveal next ring location (Controller class perk).",
          "Can chain Mantle Boost off her own walls for micro-movement and off-angle peeks (requires timing)."
        ],
        "base_speed_type": "standard_non_fortified",
        "notes": "Movement remains standard; survivability improvements are driven by wall health scaling and speed-boost mechanics rather than raw movement speed buffs."
      },
      "hitbox_category": "standard_non_fortified",
      "interactions": [
        "Walls now interact more strongly with grenades: frag grenade damage multiplier increased, Arc Star damage multiplier normalized.",
        "Battle Modder makes walls scale with Evo Level (up to ~800 wall HP and 225 shield HP at max Evo).",
        "Locked and Loaded upgrade grants infinite ammo and faster reloads while behind intact Amped Cover."
      ],
      "known_tech": [
        "Use wall charge + speed boost to enable team-wide re-peeks or quick rotations from entrenched positions.",
        "Combo Mantle Boost with existing wall-tech (crouch-peeking, head-glitch angles) for harder-to-track strafes."
      ],
      "patch_history": [
        {
          "season": "S27_Amped_Launch",
          "summary": "Full kit refresh focusing on wall durability, offensive tempo, and speed-boost utility.",
          "details": {
            "passive": {
              "old_passive_name": "Modded Loader",
              "new_passive_name": "Battle Modder",
              "effect_change": "Walls gain permanent health per Evo level in addition to LMG and Sheila bonuses."
            },
            "amped_cover": {
              "added_shield_roof": true,
              "wall_charge_max_damage": 300,
              "max_speed_boost_duration_seconds": 15,
              "speed_boost_applies_while_sprinting_only": true,
              "damage_to_wall_charge_ratio": 0.25,
              "damage_through_shield_charge_ratio": 1.0,
              "wall_health_while_building_before": 120,
              "wall_health_while_building_after": 100,
              "wall_health_increase_per_evo": 200,
              "wall_health_at_max_level_before": 400,
              "wall_health_at_max_level_after": 800,
              "shield_health_increase_per_evo": 25,
              "shield_health_at_max_level_before": 175,
              "shield_health_at_max_level_after": 225,
              "arc_star_damage_multiplier_before": 1.5,
              "arc_star_damage_multiplier_after": 1.0,
              "frag_damage_multiplier_before": 1.0,
              "frag_damage_multiplier_after": 2.0
            },
            "upgrades": {
              "level_2": {
                "ultimate_cooldown": "removed_as_upgrade",
                "bandolier": "removed",
                "combat_reserve": "new – larger ammo stacks, extra grenade slots, red Weapon Supply Bins access",
                "locked_and_loaded": "new – faster reload and infinite ammo while behind intact Amped Cover"
              },
              "level_3": {
                "ramped_up": "unchanged",
                "amped_reloads": "removed_and_replaced",
                "rebuild_module": "new – Amped Cover slowly regenerates health and shield if not damaged"
              }
            }
          }
        }
      ],
      "recommended_loadouts": [
        {
          "context": "Ranked Olympus choke control / late ring holds",
          "weapons": [
            "Rampage LMG or Spitfire",
            "Peacekeeper or Alternator SMG"
          ],
          "notes": "Lean into LMG synergies from Battle Modder. Use walls to anchor space around Olympus POIs like Hammond Labs and Somers University while shotguns/SMGs clean up pushes. Exact LMG DPS/TTK values are TBD for this patch."
        }
      ]
    },
    {
      "name": "Horizon",
      "season_version": "S27_Amped_Launch",
      "tactical": {
        "name": "Gravity Lift",
        "description": "Create a vertical lift that boosts players upward and allows aerial repositioning, now with faster lift speed, longer hang time, and much shorter effective cooldown.",
        "cooldown": 20,
        "mechanics": "Lift speed increased; top-of-lift hover extended. Base cooldown reduced by 5s and the post-use delay before cooldown begins is heavily reduced, effectively cutting real-world cooldown from ~35s to ~22s.",
        "tech": [
          "Use Gravity Lift defensively more often thanks to shorter effective cooldown.",
          "Mantle Boost interactions on exit (e.g., Boosting off the lip) are likely strong but require in-game timing validation (TBD).",
          "Pair with Newt Scoot upgrade to glide after exiting for longer horizontal rotations."
        ]
      },
      "passive": {
        "name": "Spacewalk",
        "description": "Improved air-control and reduced landing impact after drops or Gravity Lift usage, allowing faster re-centering in fights."
      },
      "ultimate": {
        "name": "Black Hole",
        "description": "Deploy Newt to create a micro-black-hole that pulls enemies and projectiles towards its center.",
        "cooldown": 180
      },
      "movement_profile": {
        "class": "Skirmisher",
        "unique_movement_passives": [
          "Spacewalk for superior air-strafing and soft-landing behavior.",
          "Mantle Boost synergy for explosive vertical/horizontal re-peeks off high ground.",
          "Skirmisher perk to see and inspect care packages."
        ],
        "base_speed_type": "standard_non_fortified",
        "notes": "Buffed Gravity Lift and ultimate uptime push Horizon back toward high-mobility anchor play, especially strong in vertical POIs on Olympus."
      },
      "hitbox_category": "standard_non_fortified",
      "interactions": [
        "Black Hole’s health increased to make it harder to break; encourages combo ult usage (Arc Stars, grenades, Rampart’s Sheila, etc.).",
        "Shorter Gravity Lift cooldown allows more frequent vertical checks over cover, making marksman/sniper angles less safe."
      ],
      "known_tech": [
        "Lift-flick peeking (brief lift, peek, drop) benefits from increased lift speed.",
        "Lift into Mantle Boost on terrain edges to chain unexpected angles (exact boost windows TBD)."
      ],
      "patch_history": [
        {
          "season": "S27_Amped_Launch",
          "summary": "Mobility and uptime buffs to make Horizon more attractive without fully restoring pre-nerf power.",
          "details": {
            "gravity_lift": {
              "lift_speed_before": 300,
              "lift_speed_after": 375,
              "hover_time_top_seconds_before": 0.5,
              "hover_time_top_seconds_after": 1.5,
              "base_cooldown_seconds_before": 25,
              "base_cooldown_seconds_after": 20,
              "cooldown_start_delay_seconds_before": 10,
              "cooldown_start_delay_seconds_after": 2,
              "effective_cooldown_seconds_before": 35,
              "effective_cooldown_seconds_after": 22
            },
            "black_hole": {
              "cooldown_seconds_before": 210,
              "cooldown_seconds_after": 180,
              "device_health_before": 175,
              "device_health_after": 225
            },
            "upgrades": {
              "level_2": [
                "Ultimate Cooldown upgrade removed (baseline now stronger)",
                "Tactical Cooldown upgrade removed (baseline now stronger)",
                "New: Gravity Boots – crouch in air to fall quickly",
                "New: Newt Scoot – jump after exiting Gravity Lift to glide"
              ],
              "level_3": [
                "Conservation of Energy unchanged",
                "Combat Reserve removed",
                "New: Knock Expert – gain tactical charge on knocks"
              ]
            }
          }
        }
      ],
      "recommended_loadouts": [
        {
          "context": "Ranked + competitive Olympus vertical fights",
          "weapons": [
            "Alternator SMG or R-99",
            "Bocek Compound Bow or G7 Scout"
          ],
          "notes": "Use lift to take top control then farm mid-range beams. Alternator’s S27 buffs fit Horizon’s short-exposure peeks; Bocek takes advantage of altitude from Gravity Lift. Exact Bocek damage/TTK for S27 are TBD."
        }
      ]
    },
    {
      "name": "Revenant",
      "season_version": "S27_Amped_Launch",
      "tactical": {
        "name": "Shadow Pounce",
        "description": "Launch forward in a long, low-profile leap to close distance or escape. In S27 the maximum velocity is reduced to limit extreme gap-closing.",
        "cooldown": "TBD",
        "mechanics": "Maximum possible Shadow Pounce velocity has been reduced to lower frustration at very high distances. Distance scaling and weapons-up timings still need firing-range validation.",
        "tech": [
          "Still strong for short- to mid-range engagements; less oppressive for long dive attacks.",
          "Mantle Boost plus Shadow Pounce likely remains high-skill tech but exact chains and distance curves are TBD."
        ]
      },
      "passive": {
        "name": "Assassin / Stalker (current rework name TBD in-game)",
        "description": "Revenant’s reworked kit focuses on aggressive engagements, fast climbing, and dive attacks. Specific passive details should be pulled from up-to-date in-game descriptions."
      },
      "ultimate": {
        "name": "TBD",
        "description": "Use in-game description for post-rework Revenant ultimate; S27 patch only alters Shadow Pounce.",
        "cooldown": "TBD"
      },
      "movement_profile": {
        "class": "Skirmisher",
        "unique_movement_passives": [
          "Enhanced climbing and ledge-scaling (exact numbers TBD).",
          "Shadow Pounce for burst gap closing.",
          "Global Mantle Boost for chained movement tech from elevated surfaces."
        ],
        "base_speed_type": "standard_non_fortified",
        "notes": "S27 specifically reduces maximum Shadow Pounce velocity to tone down extreme long-distance engages in high-tier lobbies."
      },
      "hitbox_category": "standard_non_fortified",
      "interactions": [
        "Shadow Pounce power is indirectly checked by Valkyrie and Horizon buffs (patch intent is a more even split among high-mobility legends)."
      ],
      "known_tech": [
        "Wall-climb into Shadow Pounce (distance/angle scaling TBD).",
        "Shadow Pounce into Mantle Boost on roof edges for multi-stage momentum (requires lab testing; values TBD)."
      ],
      "patch_history": [
        {
          "season": "S27_Amped_Launch",
          "summary": "Nerf to Shadow Pounce maximum velocity to reduce long-range burst engages.",
          "details": {
            "shadow_pounce": {
              "max_velocity_before": "TBD",
              "max_velocity_after": "TBD_lower_than_before",
              "design_intent": "Reduce long-range frustration while keeping close-range aggression viable."
            }
          }
        }
      ],
      "recommended_loadouts": [
        {
          "context": "High-tier Ranked dive comps",
          "weapons": [
            "Prowler PDW",
            "Alternator SMG or Peacekeeper"
          ],
          "notes": "Use Prowler’s new hold-to-burst behavior to shred at close range when diving with Shadow Pounce; pair with an SMG/shotgun to secure fast knocks. Detailed recoil and burst DPS for S27 are TBD."
        }
      ]
    }
  ],

  "weapons": [
    {
      "name": "Alternator SMG",
      "category": "SMG",
      "season_version": "S27_Amped_Launch",
      "ammo_type": "Light",
      "is_care_package_weapon": false,
      "is_gold_rotation_weapon": true,
      "damage_profile": {
        "body_damage": 19,
        "head_damage": "TBD",
        "leg_damage": "TBD",
        "notes": "Base body damage increased from 18 to 19 in S27."
      },
      "recoil_profile": {
        "pattern": "TBD",
        "notes": "No specific recoil change in S27; treat as unchanged from S26 pending firing range validation."
      },
      "projectile": {
        "type": "projectile",
        "projectile_speed": "TBD",
        "projectile_size": "unchanged",
        "notes": "No explicit projectile changes in Amped patch notes."
      },
      "attachments": {
        "magazines": [
          "White",
          "Blue",
          "Purple",
          "Gold"
        ],
        "magazine_sizes": {
          "base": "TBD",
          "white": "TBD",
          "blue": 26,
          "purple": 30,
          "gold": 30
        },
        "sights": "Standard SMG optics including iron, 1x, 2x (exact list TBD).",
        "laser_sights": [
          "White",
          "Blue",
          "Purple",
          "Gold",
          "Gold Laser Sight"
        ],
        "hopups": [
          "Double Tap Trigger (Locked Hop-Up; 375 points to unlock)"
        ]
      },
      "modes": [
        {
          "name": "Default Auto",
          "fire_mode": "full_auto",
          "body_damage": 19,
          "fire_rate_rpm": "TBD",
          "ttk_versus_100hp_ms": "TBD"
        },
        {
          "name": "Double Tap Trigger",
          "fire_mode": "dual_burst",
          "body_damage_per_bullet": 15,
          "fire_rate_rpm": "TBD_lower_than_default",
          "notes": "Fires one bullet from each barrel simultaneously per trigger pull."
        }
      ],
      "patch_history": [
        {
          "season": "S27_Amped_Launch",
          "summary": "Damage buff, mag size rebalance, and Double Tap integration.",
          "details": {
            "damage": {
              "body_before": 18,
              "body_after": 19
            },
            "magazine": {
              "blue_before": 27,
              "blue_after": 26,
              "purple_before": 29,
              "purple_after": 30,
              "gold_before": 29,
              "gold_after": 30
            },
            "double_tap_trigger": {
              "locked_hop_up_points_required": 375,
              "mode_behavior": "fires bullets from both barrels at once",
              "mode_damage_per_bullet": 15,
              "mode_fire_rate_change": "reduced_compared_to_default_auto"
            }
          }
        }
      ],
      "recommended_loadouts": [
        {
          "context": "S27 meta close-range primary",
          "perks_or_amps": [
            "Gold Laser Sight (if available)",
            "Double Tap Trigger"
          ],
          "secondary_pairings": [
            "Bocek Compound Bow",
            "G7 Scout",
            "R-301"
          ]
        }
      ]
    }
  ]
}

================================================================================
PART 2: GENERATED MASTERY MODULES (v1 - S27 READY)
Source: Generated from above dataset (Steps 52-54)
================================================================================

---
# Valkyrie – S27 "Amped" Mastery Module

{
  "legend": "Valkyrie",
  "season_version": "S27_Amped_Launch",
  "class": "Recon",
  "hitbox_category": "standard_non_fortified",
  "movement_profile": {
    "base_speed_type": "standard_non_fortified",
    "unique_movement_passives": [
      "VTOL Jets for sustained aerial movement with horizontal and vertical control.",
      "Mantle Boost chains off ledges into VTOL Jets for burst repositioning.",
      "Improved skydive descent control near the ground after Skyward Dive."
    ],
    "notes": "S27 shifts VTOL Jets toward faster, more horizontal travel at the cost of total fuel and no mid-air refuel."
  },
  "abilities": {
    "passive": {
      "name": "VTOL Jets",
      "icon": "valk_vtol_jets.png",
      "description": "Engage a jetpack to hover or fly with strong vertical and horizontal control. Fuel is limited and only refuels on the ground.",
      "details": {
        "fuel_total_seconds": 6.0,
        "recharge_delay_seconds": 2.5,
        "recharge_time_seconds": 3.0,
        "fuel_regen_condition": "only_on_ground",
        "horizontal_speed": "increased_vs_S26",
        "vertical_speed": "increased_vs_S26",
        "initial_boost_behavior": "first_0_5s_slightly_slower_than_base_move_speed"
      },
      "notes": "Treat VTOL Jets as a short, explosive travel tool instead of a permanent hover. In S27, you burn hotter and faster, then quickly refuel only after landing."
    },
    "tactical": {
      "name": "Missile Swarm",
      "icon": "valk_missile_swarm.png",
      "description": "Fire a cluster of mini-rockets that damage, disorient, and briefly reveal enemies while suppressing their movement passives.",
      "details": {
        "cooldown_seconds": 25,
        "max_range_meters": 125,
        "self_damage": false,
        "self_stun": false,
        "scan_on_hit_seconds": 1.5,
        "movement_passive_cooldown_on_hit": true,
        "vertical_clearance_restriction": "removed",
        "pathing_reliability": "improved_under_low_ceilings"
      },
      "notes": "Use Missile Swarm as both damage and control: it tags enemies with a brief scan and temporarily turns off their movement passives (e.g. Mantle Boost windows), making them easier to punish during pushes or retreats."
    },
    "ultimate": {
      "name": "Skyward Dive",
      "icon": "valk_skyward_dive.png",
      "description": "Charge then launch your squad into a redeploy skydive, scouting rotations and third-party opportunities from the air.",
      "details": {
        "cooldown_seconds": 150,
        "launch_height_scalar": 1.15,
        "takeoff_delay_seconds": 1.5,
        "slow_rise_duration_seconds": 1.33,
        "damage_cooldown_penalty_seconds": 30,
        "self_cancel_cooldown_penalty": false,
        "tactical_usable_while_skydiving": true,
        "tactical_usable_from_dropship": false
      },
      "notes": "Pre-launch lockout is shorter and the climb is faster than S26. You can fire Missile Swarm while skydiving (but not from the dropship), letting you scan fights you might third-party."
    }
  },
  "techniques": [
    {
      "name": "Jet Strafe Poke",
      "difficulty": "Intermediate",
      "description": "Short VTOL bursts to peek over cover, beam, and drop back before enemies can punish you.",
      "steps": [
        "Take an off-angle near mid-height cover with an AR or marksman weapon.",
        "Tap VTOL Jets for a short vertical burst, ADS and fire a quick burst at exposed targets.",
        "Cut jets immediately and drop behind cover, letting fuel recover on the ground.",
        "Repeat with slight lateral adjustments to avoid predictable timing."
      ],
      "tips": "Abuse S27’s faster horizontal/vertical VTOL speeds, but keep burns under one second so you do not drift out of cover or run dry. Mantle Boost into a jet burst to create harder-to-track directional changes."
    },
    {
      "name": "Missile Lock Third Party",
      "difficulty": "Beginner",
      "description": "Use Missile Swarm from mid-range to tag both squads in an ongoing fight before committing with Skyward Dive or a push.",
      "steps": [
        "Hold a safe ridge or rooftop overlooking a fight.",
        "Aim Missile Swarm where both teams are trading around cover or doors.",
        "Fire to tag multiple targets, applying scan and movement suppression.",
        "If the fight is low-HP, follow up with a Skyward Dive reposition or a direct push along your safest lane."
      ],
      "tips": "Because Missile Swarm no longer self-stuns or self-damages, it is safe to fire aggressively from edges. The scan helps your team focus low targets, and the movement suppression punishes legends who rely on gap-closing tech."
    }
  ],
  "loadouts": {
    "S-Tier": [
      {
        "weapons": ["Alternator SMG", "Bocek Compound Bow"],
        "name": "Jet Harasser",
        "reason": "Alternator’s S27 damage and Double Tap give reliable close-mid beams from VTOL peeks, while Bocek punishes tags from altitude. Valk’s vertical control turns Bocek into a high-ground bully weapon."
      }
    ]
  },
  "drills": [
    {
      "title": "VTOL Peek Rhythm",
      "focus": "Aiming & Exposure Management",
      "objective": "Learn a consistent cadence for VTOL peeks that maximizes damage and minimizes time exposed.",
      "instructions": [
        "In Firing Range, pick a medium cover object and mark a dummy as your target.",
        "Practice short VTOL bursts: rise, fire a 5–7 bullet burst, cut jets, drop.",
        "Count a simple rhythm in your head (e.g. ‘up, burst, down’) to keep peeks under one second.",
        "Once comfortable, add horizontal strafe and off-angles around the same cover."
      ],
      "tips": "Review your own behavior: if you hover to track targets, you are doing too much. Your goal is to make enemies aim at where you were a moment ago, not where you are now."
    }
  ],
  "meta": "In S27, Valkyrie returns to S-tier as a rotational anchor and information engine. Faster VTOL Jets and a lower-cooldown, higher-utility Skyward Dive make her the safest way to cross dead space on Olympus and Broken Moon. Missile Swarm’s scan and movement-passive shutdown add soft crowd control that punishes dive comps and wall-climbers.",
  "maps": "Valkyrie thrives on maps with vertical routing and long rotations. On Olympus, she bridges the frozen gaps between Somers University, Gravity Engine, and Hammond with minimal risk. On Broken Moon and World’s Edge, she bypasses exposed chokes and takes power positions above central POIs."
}

---
# Rampart – S27 "Amped" Mastery Module

{
  "legend": "Rampart",
  "season_version": "S27_Amped_Launch",
  "class": "Controller",
  "abilities": {
    "passive": {
      "name": "Battle Modder",
      "icon": "ramp_battle_modder.png",
      "description": "Enhances LMGs, Sheila, and Amped Cover health based on Evo level.",
      "details": {
        "old_passive_name": "Modded Loader",
        "lmgs_reload_speed_bonus": "inherits_Modded_Loader_values",
        "lmgs_mag_size_bonus": "inherits_Modded_Loader_values",
        "wall_health_base": 400,
        "wall_health_at_max_evo": 800,
        "shield_health_base": 175,
        "shield_health_at_max_evo": 225
      },
      "notes": "Every armor level ramps wall durability. Full Evo Rampart becomes extremely difficult to dislodge."
    },
    "tactical": {
      "name": "Amped Cover",
      "icon": "ramp_amped_cover.png",
      "description": "Deploy cover that builds into a fortified wall with an amped shield and roof, storing damage to convert into sprint speed boosts.",
      "details": {
        "wall_health_while_building": 100,
        "has_roof": true,
        "wall_charge_max_damage": 300,
        "max_speed_boost_duration_seconds": 15,
        "speed_boost_applies_while_sprinting_only": true
      },
      "notes": "Damage dealt through the amped shield charges the wall fully. Stored charge converts to a team sprint speed burst on vault/destruction."
    }
  },
  "meta": "S27 turns Rampart into a premier anchor for Ranked Olympus and late-ring setups. Battle Modder’s Evo scaling and Amped Cover’s roof plus speed-boost mechanics let her control space early and then convert that control into decisive pushes."
}

---
# Horizon – S27 "Amped" Mastery Module

{
  "legend": "Horizon",
  "season_version": "S27_Amped_Launch",
  "class": "Skirmisher",
  "abilities": {
    "tactical": {
      "name": "Gravity Lift",
      "icon": "horizon_gravity_lift.png",
      "description": "Create a vertical lift that boosts players upward, now with faster lift speed and longer hover.",
      "details": {
        "lift_speed_after": 375,
        "hover_time_top_seconds_after": 1.5,
        "effective_cooldown_seconds_after": 22
      },
      "notes": "Lift comes up faster, hovers longer, and recharges much sooner."
    }
  },
  "meta": "Horizon is again a top-tier pick in S27 on maps that reward vertical control, especially Olympus."
}

---
# Sparrow – S27 "Amped" Mastery Module

{
  "legend": "Sparrow",
  "season_version": "S27_Amped_Launch",
  "class": "Recon",
  "abilities": {
    "passive": {
      "name": "Double Jump",
      "description": "Perform an additional jump while airborne, gaining a horizontal or vertical burst of momentum.",
      "details": {
        "activation_condition": "must_be_airborne",
        "momentum_scaling": "based_on_initial_velocity_direction"
      }
    },
    "tactical": {
      "name": "Tracker Dart",
      "description": "Fire a dart that reveals the target’s location and movement trail.",
      "details": {
        "cooldown_seconds": 30,
        "reveal_duration_seconds": 8,
        "max_mark_distance_meters": 70
      }
    }
  },
  "meta": "Sparrow benefits from a meta that rewards mobility bursts and mid-range tracking. Vertical POIs across Olympus make Double Jump a top-tier repositioning tool."
}

---
# Revenant – S27 "Amped" Mastery Module

{
  "legend": "Revenant",
  "season_version": "S27_Amped_Launch",
  "class": "Skirmisher",
  "abilities": {
    "tactical": {
      "name": "Shadow Pounce",
      "description": "Launch forward in a long, low-profile leap. S27 reduces maximum velocity.",
      "details": {
        "cooldown_seconds": 22,
        "max_range_meters": 35,
        "max_velocity_after": "reduced_value_TBD"
      },
      "notes": "Nerf affects extreme distances. Short-range entries remain very strong."
    }
  },
  "meta": "In S27, Revenant shifts from a cross-map dive bomber to a mid-range executioner. Pounce velocity nerf removes ability to initiate fights from 'nowhere', forcing calculated positioning."
}

