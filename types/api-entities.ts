import type { QueryOptions } from "types/query-generator";

/**
 * Base types
 */

export interface Cron {
  name: string;
  pattern: string;
  status: "ok" | "stopped";
  busy: boolean;
  runs: {
    next: number | null;
    current: number | null;
    previous: number | null;
  };
}

export interface Entity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface RemoteEntity extends Entity {
  index: number;
}

/**
 * Model types
 */

export interface War extends RemoteEntity {
  time: string;
  endDate: string;
  startDate: string;
}

export interface Sector extends RemoteEntity {
  name: string;
  planets: Planet[];
}

export interface Faction extends RemoteEntity {
  name: string;
  orders?: Order[];
  planets: Planet[];
  homeWorld?: Planet;
  initialPlanets: Planet[];
  globalEvents?: GlobalEvent;
}

export interface Planet extends RemoteEntity {
  name: string;
  owner?: Faction;
  ownerId: number;
  sector: Sector;
  sectorId: number;
  imageUrl: string;
  effects: Effect[];
  biome: Biome;
  biomeId: number;
  health: number;
  orders?: Order[];
  maxHealth: number;
  players: number;
  liberation: number;
  liberationRate: number;
  liberationState: "WINNING" | "DRAW" | "LOSING" | "N/A";
  disabled: boolean;
  positionX: number;
  positionY: number;
  statistic?: Stat;
  statisticId: number;
  attacking: Attack[];
  defending: Attack[];
  campaign?: Campaign;
  regeneration: number;
  homeWorld?: HomeWorld;
  initialOwner?: Faction;
  initialOwnerId: number;
  globalEvent?: GlobalEvent;
  globalEventId: number;
}

export interface GlobalEvent extends RemoteEntity {
  title: string;
  faction?: Faction;
  factionId: number;
  message: string;
  planets: Planet[];
}

export interface Campaign extends RemoteEntity {
  type: number;
  count: number;
  planet?: Planet;
  planetId: number;
  orders?: Order[];
}

export interface HomeWorld extends RemoteEntity {
  faction?: Faction;
  factionId: number;
  planet?: Planet;
  planetId: number;
}

export interface Attack extends RemoteEntity {
  target?: Planet;
  targetId: number;
  source?: Planet;
  sourceId: number;
}

export interface Order extends RemoteEntity {
  planet?: Planet;
  planetId?: number;
  faction?: Faction;
  factionId?: number;
  campaign?: Campaign;
  campaignId?: number;
  eventType: "DEFEND" | "ATTACK";
  health: number;
  maxHealth: number;
  hqNodeIndex: number;
  startTime: string;
  expireTime: string;
}

export interface StratagemCategory extends Entity {
  name: string;
}

export interface Stratagem extends Entity {
  name: string;
  uses: string;
  imageUrl: string;
  activation: number;
  codename: string | null;
  cooldown: number | null;
  group?: StratagemCategory;
  keys: Array<"up" | "down" | "left" | "right">;
}

export interface Stat extends Entity {
  deaths: number;
  planet?: Planet;
  revives: number;
  accuracy: number;
  bugKills: number;
  timePlayed: number;
  bulletsHit: number;
  missionsWon: number;
  missionTime: number;
  bulletsFired: number;
  missionsLost: number;
  friendlyKills: number;
  automatonKills: number;
  illuminateKills: number;
  missionSuccessRate: number;
}

export interface Report extends RemoteEntity {
  type: number;
  tagIds: string;
  message: string;
  publishedAt: string;
}

export interface Reward extends RemoteEntity {
  type: number;
  amount: number;
  assignment?: Assignment;
}

export interface Assignment extends RemoteEntity {
  type: number;
  title: string;
  briefing: string;
  reward?: Reward;
  rewardId: number;
  progress: number;
  expiresAt: string;
  description: string;
}

export interface Biome extends Entity {
  index: string;
  name: string;
  description: string;
  planets: Planet[];
}

export interface Effect extends Entity {
  index: string;
  name: string;
  description: string;
  planets: Planet[];
}

/**
 * Network request types
 */

export type QueryObject<T> = QueryOptions<T extends any[] ? T[0] : T>;

export interface APIPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface APIRequestInit<T extends Entity | Array<Entity> = any>
  extends Omit<RequestInit, "cache"> {
  query?: QueryObject<T>;
  cache?: { enabled: boolean; durationMinutes: number };
}

export interface APIResponseBody<T extends Entity | Array<Entity> = any> {
  data: T | null;
  error: { details: string[] } | null;
}

export type APIResponsePayload<T extends Entity | Array<Entity> = any> =
  T extends Entity[]
    ? APIResponseBody<T> & { pagination: APIPagination }
    : APIResponseBody<T>;

export interface APIResponse<T extends Entity | Array<Entity> = any>
  extends Omit<Response, "json"> {
  json(): Promise<APIResponsePayload<T>>;
}
