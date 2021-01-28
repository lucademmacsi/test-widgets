import * as d3Sankey from 'd3-sankey';

export interface DAG {
    nodes: SNode[];
    links: SLink[];
}

interface SNodeExtra {
    nodeId: number;
    name: string;
}

interface SLinkExtra {
    source: number;
    target: number;
    value: number;
    uom: string;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;