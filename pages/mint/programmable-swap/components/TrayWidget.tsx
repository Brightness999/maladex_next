import React from 'react';
import styled from '@emotion/styled';

namespace S {
	export const Tray = styled.div`
		min-width: 100px;
		// background: rgb(20, 20, 20);
		flex-grow: 0;
		flex-shrink: 0;
		position: absolute;
		top: 60px;
		z-index: 1;
	`;
}

export class TrayWidget extends React.Component {
	render() {
		return <S.Tray>{this.props.children}</S.Tray>;
	}
}
