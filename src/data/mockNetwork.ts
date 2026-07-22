import type {
  Community,
  GraphLink,
  GraphNode,
  Person,
} from "@/types";
import { seeded } from "@/lib/utils";

const rand = seeded(555);

const NAMES = [
  "Ravi Kumar", "Suresh Rao", "Arjun Nair", "Manoj Gowda", "Prakash Shetty",
  "Vinod Patil", "Kiran Reddy", "Deepak Naik", "Santosh Hegde", "Rahul Das",
  "Imran Khan", "Ganesh Bhat", "Nitin Joshi", "Vikram Singh", "Rakesh Menon",
  "Sunil Kamath", "Harish Rai", "Ashok Pujari", "Naveen Achar", "Girish Kulkarni",
  "Farhan Ali", "Mahesh Yadav",
];
const CRIME_POOL = ["Theft", "Burglary", "Cheating / Fraud", "Assault", "Cyber Crime", "Drugs"];
const DIST_POOL = ["Bengaluru City", "Mysuru", "Tumakuru", "Belagavi", "Dharwad", "Ballari"];

// 5 communities (spec §60).
export const communities: Community[] = Array.from({ length: 5 }, (_, i) => ({
  id: `C-${17 + i}`,
  people: 6 + Math.floor(rand() * 6),
  cases: 9 + Math.floor(rand() * 8),
  districts: 2 + Math.floor(rand() * 3),
  label: `Network Cluster C-${17 + i}`,
}));

// 22 synthetic persons; ≥10 are repeat offenders (caseCount ≥ 3).
export const persons: Person[] = NAMES.map((name, i) => {
  const caseCount = i < 12 ? 3 + Math.floor(rand() * 4) : 1 + Math.floor(rand() * 2);
  const districtCount = 1 + Math.floor(rand() * Math.min(caseCount, 4));
  const crimeTypes = Array.from(
    new Set(Array.from({ length: 1 + Math.floor(rand() * 2) }, () => CRIME_POOL[Math.floor(rand() * CRIME_POOL.length)]))
  );
  const dists = Array.from(
    new Set(Array.from({ length: districtCount }, () => DIST_POOL[Math.floor(rand() * DIST_POOL.length)]))
  );
  const cases = Array.from({ length: caseCount }, (_, k) => `KSP-${2024 + (k % 3)}-${String(200 + i * 7 + k).padStart(5, "0")}`);
  return {
    id: `GP-${String(8391 - i * 13).padStart(6, "0")}`,
    name,
    ageRange: ["21–25", "26–30", "31–35", "36–40"][Math.floor(rand() * 4)],
    gender: rand() < 0.85 ? "M" : "F",
    caseCount,
    districtCount: dists.length,
    coAccusedLinks: 1 + Math.floor(rand() * 5),
    crimeTypes,
    districts: dists,
    jurisdictionSpread: dists.length >= 3 ? "High" : dists.length === 2 ? "Medium" : "Low",
    firstObserved: `${2022 + Math.floor(rand() * 2)}-0${1 + Math.floor(rand() * 8)}-1${Math.floor(rand() * 9)}`,
    lastCase: `2026-07-${String(2 + Math.floor(rand() * 16)).padStart(2, "0")}`,
    entityMatch: 82 + Math.floor(rand() * 15),
    communityId: communities[i % communities.length].id,
    cases,
  };
});

export const personById = (id: string) => persons.find((p) => p.id === id);
export const repeatOffenders = persons
  .filter((p) => p.caseCount >= 3)
  .sort((a, b) => b.caseCount - a.caseCount);

// Hero person (spec §40) — align the first record to the referenced id.
persons[0].id = "GP-008391";
persons[0].name = "Ravi Kumar";
persons[0].caseCount = 5;
persons[0].districtCount = 3;
persons[0].coAccusedLinks = 4;
persons[0].crimeTypes = ["Theft", "Burglary"];
persons[0].jurisdictionSpread = "High";
persons[0].entityMatch = 94;

// ---- Force-directed graph for the hero person's neighbourhood --------------
function buildGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const seen = new Set<string>();
  const add = (n: GraphNode) => {
    if (!seen.has(n.id)) {
      seen.add(n.id);
      nodes.push(n);
    }
  };

  const core = persons.slice(0, 12);
  core.forEach((p) => add({ id: p.id, label: p.name, type: "person", community: p.communityId }));

  const caseSet = new Set<string>();
  core.forEach((p, pi) => {
    p.cases.slice(0, 3).forEach((c) => {
      add({ id: c, label: c, type: "case", community: p.communityId });
      links.push({ source: p.id, target: c, rel: "ACCUSED_IN" });
      caseSet.add(c);
      // co-accused: link another core person to some cases
      if (pi < 8 && rand() < 0.5) {
        const other = core[(pi + 1 + Math.floor(rand() * 3)) % core.length];
        links.push({ source: other.id, target: p.id, rel: "CO_ACCUSED" });
      }
    });
  });

  // a few locations, stations, crime-type nodes
  const locs = ["Indiranagar", "Whitefield", "Majestic", "Kuvempunagar"];
  const stationsN = ["Bengaluru East PS", "Mysuru City PS"];
  locs.forEach((l, i) => {
    add({ id: `LOC-${i}`, label: l, type: "location" });
    const c = [...caseSet][i % caseSet.size];
    if (c) links.push({ source: c, target: `LOC-${i}`, rel: "OCCURRED_AT" });
  });
  stationsN.forEach((s, i) => {
    add({ id: `STN-${i}`, label: s, type: "station" });
    const c = [...caseSet][(i + 2) % caseSet.size];
    if (c) links.push({ source: c, target: `STN-${i}`, rel: "REGISTERED_AT" });
  });
  ["Vehicle Theft", "House Break"].forEach((ct, i) => {
    add({ id: `CT-${i}`, label: ct, type: "crime" });
    const c = [...caseSet][(i + 1) % caseSet.size];
    if (c) links.push({ source: c, target: `CT-${i}`, rel: "CLASSIFIED_AS" });
  });

  return { nodes, links };
}

export const networkGraph = buildGraph();

export const networkStats = {
  connectedCases: networkGraph.nodes.filter((n) => n.type === "case").length,
  uniquePeople: networkGraph.nodes.filter((n) => n.type === "person").length,
  districts: 4,
  strongestCoOccurrence: "3 shared cases",
};
