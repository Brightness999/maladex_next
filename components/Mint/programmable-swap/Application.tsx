import * as SRD from '@projectstorm/react-diagrams';

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
		const swapcode = JSON.parse(window.localStorage.getItem('swapcode'));
		if (swapcode) {
			if (swapcode.code) {
				if (swapcode.code.nodes) {
					let nodes = [];
					swapcode.code.nodes.forEach(element => {
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
					swapcode.code.edges.forEach(edge => {
						let link = nodes[edge.source].getOutPorts()[0].link(nodes[edge.target].getInPorts()[0])
						this.activeModel.addLink(link);
					});
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
