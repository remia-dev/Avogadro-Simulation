import { useState } from "react";
import "./App.css";
import Mattersim from "./components/Mattersim";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function App() {
  const [numMolecules, setNumMolecules] = useState<number>(50);
  const [moleculeSize, setMoleculeSize] = useState<number>(20);
  const [moleculeSpeed, setMoleculeSpeed] = useState<number>(10);
  const handleNumMolecule = (_event: Event, newValue: number) => {
    setNumMolecules(newValue);
    console.log(newValue);
  };

  const handleSizeMolecule = (_event: Event, newValue2: number) => {
    setMoleculeSize(newValue2);
  };
  const handleSpeedMolecule = (_event: Event, newValue3: number) => {
    setMoleculeSpeed(newValue3);
  };

  return (
    <div>
      <div className="font-serif text-4xl p-5">Avogadro's Law Simulation</div>
      <div className="flex">
        <Mattersim
          numMolecules={numMolecules}
          moleculeSize={moleculeSize}
          moleculeSpeed={moleculeSpeed}
        />
        <div>
          <div className="p-5 ">
            <div className="font-serif text-xl">
              Number of molecules: {numMolecules}
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ margin: 0 }}
                  aria-label="Number of molecules"
                  value={numMolecules}
                  // getAriaValueText={valueText}
                  valueLabelDisplay="auto"
                  onChange={handleNumMolecule}
                  shiftStep={30}
                  step={10}
                  marks
                  min={10}
                  max={200}
                />
              </Box>
            </div>
            <div className="font-serif text-xl">
              Molecule Size: {moleculeSize}
              <Box sx={{ width: 300}}>
                <Slider
                  sx={{ margin: 0 }}
                  aria-label="Molecule size"
                  value={moleculeSize}
                  valueLabelDisplay="auto"
                  onChange={handleSizeMolecule}
                  shiftStep={30}
                  step={10}
                  marks
                  min={10}
                  max={50}
                />
              </Box>
            </div>
            <div className="font-serif text-xl">
              Molecule Speed: {moleculeSpeed}
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Molecule size"
                  value={moleculeSpeed}
                  valueLabelDisplay="auto"
                  onChange={handleSpeedMolecule}
                  shiftStep={30}
                  step={5}
                  marks
                  min={5}
                  max={30}
                />
              </Box>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Return to Normal
              </span>
            </button>
          </div>
          <div className="font-serif text-gray-600">
            <span className="display: inline-block; font-size: 24px; color: #000000; background: #cccccc; border-radius: 6px; padding: 10px 20px;">© to Jeremiah Eledia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
