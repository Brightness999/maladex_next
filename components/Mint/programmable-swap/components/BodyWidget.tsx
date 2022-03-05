import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import Application from '../Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from 'components/Helper/DemoCanvasWidget';
import styled from '@emotion/styled';

export interface BodyWidgetProps {
  app: Application;
  isadd?: boolean;
  handleAdd?: any;
  handleChangeApp?: any;
}

namespace S {
  export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 400px;
	`;

  export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

  export const Content = styled.div`
		display: flex;
		flex-grow: 1;
    position: relative;
	`;

  export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;

  export const AddNode = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    background-color: #c0ff00;
    padding: 0 2rem;
    font-size: 1.5rem;
    border-radius: 1.5rem;
  `
}

export default class BodyWidget extends React.Component<BodyWidgetProps> {
  render() {
    return (
      <S.Body>
        <S.Header>
          <div className="title">DAG (Direct Acyclic Graph) Composer</div>
        </S.Header>
        <S.Content>
          <S.AddNode onClick={() => this.props.handleAdd(true)}>+</S.AddNode>
          {
            this.props.isadd &&
            <TrayWidget>
              <TrayItemWidget model={{ type: 'out', step: 'input' }} name="Input" color="rgb(13,202,240)" />
              <TrayItemWidget model={{ type: 'in', step: 'output' }} name="Output" color="rgb(13,202,240)" />
              <TrayItemWidget model={{ type: 'both', step: 'function' }} name="f(x)" color="rgb(226,1,0)" />
              <TrayItemWidget model={{ type: 'out', step: 'fuse' }} name="fuse" color="rgb(211,172,36)" />
              <TrayItemWidget model={{ type: 'in', step: 'result' }} name="X" color="rgb(255,143,128)" />
            </TrayWidget>
          }
          <S.Layer
            onDrop={(event) => {
              var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));

              var node: DefaultNodeModel = null;
              switch (data.step) {
                case 'input': node = new DefaultNodeModel('Input', 'rgb(13,202,240)'); break;
                case 'output': node = new DefaultNodeModel('Output', 'rgb(13,202,240)'); break;
                case 'function': node = new DefaultNodeModel('f(x)', 'rgb(226,1,0)'); break;
                case 'fuse': node = new DefaultNodeModel('fuse', 'rgb(211,172,36)'); break;
                case 'result': node = new DefaultNodeModel('X', 'rgb(255,143,128)'); break;
                default: break;
              }
              switch (data.type) {
                case 'in': node.addInPort('In'); break;
                case 'out': node.addOutPort('Out'); break;
                case 'both': node.addInPort('In'); node.addOutPort('Out'); break;
                default: break;
              }
              var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
              node.setPosition(point);
              this.props.handleChangeApp(node);
              this.props.handleAdd(false);
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}>
            <DemoCanvasWidget>
              <CanvasWidget engine={this.props.app.getDiagramEngine()} />
            </DemoCanvasWidget>
          </S.Layer>
        </S.Content>
      </S.Body>
    );
  }
}
