import { request } from "utils/request";

import {
  generateDynamicRequestFn,
  generateSingleRequestFn,
} from "utils/request-generator";

import type {
  War,
  Stat,
  Biome,
  Order,
  Effect,
  Attack,
  Planet,
  Sector,
  Report,
  Faction,
  Stratagem,
  Assignment,
  GlobalEvent,
} from "types/api-entities";

class SDK {
  private static instance: SDK;

  private constructor() {}

  public static getInstance(): SDK {
    if (!SDK.instance) SDK.instance = new SDK();
    return SDK.instance;
  }

  /**
   * Request a endpoint directly. You can use the `query` property inside the `options` object
   * to pass a type safe query object similar to the input of predefined methods.
   */
  request = request;

  /**
   * ### War
   *
   * The current war season is the 1st. The war season is a period of time in which the
   * factions fight for control of the planets. The war season has a start and an end date.
   *
   * Endpoint: `/api/war`
   */
  war = generateSingleRequestFn<War>("war");

  /**
   * ### Orders
   *
   * Determine what planets need to be defended or attacked. When a attack/defend order is
   * given, the whole community will try to attack/defend the planet.
   *
   * Endpoint: `/api/orders(/:id)`
   */
  orders = generateDynamicRequestFn<Order>("orders");

  /**
   * ### Sectors
   *
   * Contains a number of planets and defines a area on the galaxy map. Every planet
   * has a sector assigned to it.
   *
   * Endpoint: `/api/sectors(/:id)`
   */
  sectors = generateDynamicRequestFn<Sector>("sectors");

  /**
   * ### Planets
   *
   * Celestial bodies inside a sector. As the war for democracy rages on, the planets
   * are the main battlegrounds. Planets carry player counts and have a controlling faction.
   *
   * Endpoint: `/api/planets(/:id)`
   */
  planets = generateDynamicRequestFn<Planet>("planets");

  /**
   * ### Reports
   *
   * You can find reports by pressing R2 or the PC equivalent while in your ship. Contain bits
   * of story and lore based on the players actions and performance in the war.
   *
   * Endpoint: `/api/reports(/:id)`
   */
  reports = generateDynamicRequestFn<Report>("reports");

  /**
   * ### Attacks
   *
   * Attacks always have a source and a target. The source is the planet that the attack is coming
   * from, and the target is the planet that the attack is going to. You an check the attack progress
   * by having a look on the planet's health properties.
   *
   * Endpoint: `/api/attacks(/:id)`
   */
  attacks = generateDynamicRequestFn<Attack>("attacks");

  /**
   * ### Factions
   *
   * Divided in three groups: Terminids, Humans and Automatons. Humans are the only faction
   * that can be controlled by players. The other two are controlled by the game as
   * Non-Player Characters (NPCs).
   *
   * Endpoint: `/api/factions(/:id)`
   */
  factions = generateDynamicRequestFn<Faction>("factions");

  /**
   * ### Events
   *
   * Events are in game briefings and updates that are sent to the players. They are used to
   * inform the players about the current state of the game and the war.
   *
   * Endpoint: `/api/events(/:id)`
   */
  events = generateDynamicRequestFn<GlobalEvent>("events");

  /**
   * ### Statistics
   *
   * Statistics for the entire galaxy or a specific planet, this includes number of kills,
   * friendly fire kills etc. Please Note that not every planet has statistics, this is
   * because there may not have been fought a battle on it yet.
   *
   * Endpoint: `/api/statistics(/:id)`
   */
  statistics = generateDynamicRequestFn<Stat>("statistics");

  /**
   * ### Stratagems
   *
   * Stratagems are a way to represent the unique tactics and abilities of your army, and can be
   * used to give you an edge in battle. Each stratagem has a cost has its own key combination
   * to activate it.
   *
   * Endpoint: `/api/stratagems(/:id)`
   */
  stratagems = generateDynamicRequestFn<Stratagem>("stratagems");

  /**
   * ### Assignments
   *
   * Assignments are **Major Orders** that are very important to the war progress. It is possible
   * that a given time there is no Major Order(s).
   *
   * Endpoint: `/api/assignments(/:id)`
   */
  assignments = generateDynamicRequestFn<Assignment>("assignments");

  /**
   * ### Biomes
   *
   * Describe the planets fauna and flora, each planet must have a distinct biome.
   *
   * Endpoint: `/api/biomes(/:id)`
   */
  biomes = generateDynamicRequestFn<Biome>("biomes");

  /**
   * ### Environmental Effects
   *
   * Effects that influence the player, can also be physical events like meteor showers,
   * fire tornadoes etc.
   *
   * Endpoint: `/api/effects(/:id)`
   */
  effects = generateDynamicRequestFn<Effect>("effects");
}

const HellHub = SDK.getInstance();
export default HellHub;
