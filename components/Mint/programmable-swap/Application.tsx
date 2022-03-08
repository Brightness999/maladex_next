import * as SRD from '@projectstorm/react-diagrams';
import { NodeType } from './components/BodyWidget';

export default class Application {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.newModel();
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);
		const swapcodes = JSON.parse(window.localStorage.getItem('swapcodes'));
		let id = history.state.as.split('/')[3];
		if (swapcodes) {
			if (swapcodes.length > id) {
				if (swapcodes[id].code) {
					if (swapcodes[id].code.nodes) {
						let nodes = [];
						swapcodes[id].code.nodes.forEach((element: NodeType) => {
							let node = new SRD.DefaultNodeModel(element.name, element.color);
							if (element.type == 'input') {
								node.addInPort('In');
							} else if (element.type == 'output') {
								node.addOutPort('Out');
							} else {
								node.addOutPort('Out');
								node.addInPort('In');
							}
							node.getOutPorts
							node.setPosition(element.position.x, element.position.y);
							this.activeModel.addNode(node);
							nodes.push(node);
						});
						swapcodes[id].code.edges.forEach((edge: { source: string | number; target: string | number; }) => {
							let link = nodes[edge.source].getOutPorts()[0].link(nodes[edge.target].getInPorts()[0])
							this.activeModel.addLink(link);
						});
					}
				}
			}
		}
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
