import React from "react";
import dynamic from "next/dynamic";

const ProgrammableSwap = dynamic(() => import('./ProgrammableSwap'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div>
      <div className="d-flex">
        <div>ID + Title</div>
        <div className="d-flex">
          <div>Parametrisation summary</div>
          <button>Review</button>
        </div>
      </div>
      <div className="d-flex">
        <div style={{flex: 5}}>
          <ProgrammableSwap />
        </div>
        <div className="p-4" style={{flex: 2}}>
          <div>Resources</div>
          <div>
            <input type="text" />
            <div>ADA</div>
          </div>
          <div>
            <input type="text" />
            <div>USD</div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div style={{flex: 5}} className="position-relative">
          <div className="position-absolute">
            <div>
              Programmable Swap Code (for the selected node above)
            </div>
            <div>
              Custom code
            </div>
          </div>
        </div>
        <div className="p-4" style={{flex: 2}}>
          <div>Errors</div>
        </div>
      </div>
    </div>
  );
}

export default Home;