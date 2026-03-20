export interface Publication {
  id: string;
  title: string;
  shortTitle: string;
  journal: string;
  volume: string;
  date: string;
  authors: string[];
  abstract: string;
  highlights: string[];
  keywords: string[];
  doi?: string;
  url?: string;
  icon: string;
}

export const publications: Publication[] = [
  {
    id: "ev-green",
    title:
      "EV-GREEN: A Hybrid MILP and Graph-Based Heuristic Framework for Electric-Vehicle Eco-Routing with GreenZone Prioritization and Vehicle-to-Grid (V2G) Incentive Integration",
    shortTitle: "EV-GREEN",
    journal: "Computing (Springer Nature)",
    volume: "Vol. 108, Article 27",
    date: "Feb 2026",
    authors: ["Kripa Sindhu", "et al."],
    abstract:
      "Proposed a hybrid MILP and graph-based heuristic framework for electric-vehicle eco-routing with GreenZone prioritization and Vehicle-to-Grid (V2G) incentive integration. The framework optimizes route selection for electric vehicles by balancing energy efficiency, green zone compliance, and V2G revenue opportunities across urban transportation networks.",
    highlights: [
      "Hybrid optimization combining Mixed-Integer Linear Programming with graph-based heuristics",
      "GreenZone prioritization algorithm for environmentally-conscious route planning",
      "Vehicle-to-Grid (V2G) incentive model enabling EVs to sell energy back to the grid during stops",
      "Demonstrated significant improvements in eco-routing efficiency over baseline algorithms",
    ],
    keywords: [
      "Electric Vehicles",
      "Eco-Routing",
      "MILP",
      "V2G",
      "Graph Heuristics",
      "GreenZone",
    ],
    url: "https://link.springer.com/article/10.1007/s00607-026-01625-0",
    icon: "menu_book",
  },
];
