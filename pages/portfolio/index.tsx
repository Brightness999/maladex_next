import React from "react";
import Portfolio from "components/Portfolio";

type Props = {
  theme: string;
  page: string;
}
const Home: React.FC<Props> = (props) => {
  return (
    <Portfolio
      theme={props.theme}
      page={props.page}
    />
  );
}

export default Home;