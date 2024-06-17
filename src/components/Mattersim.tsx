import React, { useEffect, useRef, useState } from "react";
import Matter, { Bodies, Body } from "matter-js";

interface SimulationProps {
  numMolecules: number;
  moleculeSize: number;
  moleculeSpeed: number;
}

const MatterScene: React.FC<SimulationProps> = ({
  numMolecules,
  moleculeSize,
  moleculeSpeed,
}) => {
  const scene = useRef<HTMLDivElement>(null);
  const [pistonHeight, setPistonHeight] = useState<number>(400);
  // const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const maxHeight = 800;
  const minHeight = 400;

  useEffect(() => {
    // Create an engine
    const newEngine = Matter.Engine.create();
    newEngine.world.gravity.y = 0;
    const world = newEngine.world;

    // Create a renderer
    const render = Matter.Render.create({
      // engine.gravity.y = 0,
      element: scene.current!,
      engine: newEngine,
      options: {
        width: 800,
        height: pistonHeight,
        wireframes: false,
      },
    });

    // Create walls and piston
    const ground = Bodies.rectangle(400, pistonHeight + 30, 800, 60, {
      isStatic: true,
    });
    const leftWall = Bodies.rectangle(-30, pistonHeight / 2, 60, pistonHeight, {
      isStatic: true,
    });
    const rightWall = Bodies.rectangle(
      830,
      pistonHeight / 2,
      60,
      pistonHeight,
      { isStatic: true }
    );
    const piston = Bodies.rectangle(400, -30, 800, 60, { isStatic: true });

    const walls = [ground, leftWall, rightWall, piston];

    const molecules = Array.from({ length: numMolecules }, () => {
      const x = Math.random() * (800 - 2 * moleculeSize) + moleculeSize;
      const y = Math.random() * (600 - 2 * moleculeSize) + moleculeSize;
      const molecule = Bodies.circle(x, y, moleculeSize, {
        inertia: Infinity,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
      });
      Body.setVelocity(molecule, {
        x: (Math.random() - 0.5) * moleculeSpeed,
        y: (Math.random() - 0.5) * moleculeSpeed,
      });
      return molecule;
    });

    // Add molecules to the world
    Matter.World.add(world, [...walls, ...molecules]);

    // Run the engine and renderer
    Matter.Runner.run(newEngine);
    Matter.Render.run(render);

    // Cleanup the Matter.js engine on component unmount
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(newEngine);
      Matter.World.clear(world, false);
      render.canvas.remove();
      render.canvas = null!;
      render.context = null!;
      render.textures = {};
    };
  }, [numMolecules, moleculeSize, pistonHeight, moleculeSpeed]);

  // Increase the height of the piston container
  const addMolecule = () => {
    setPistonHeight((prev) => prev + 20);
  };
  const delMolecule = () => {
    setPistonHeight((prev) => prev - 20);
  };

  return (
    <div>
      <div>
        <div
          className="flex justify-center"
        >
          <button
            onClick={addMolecule}
            disabled={pistonHeight >= maxHeight}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add Height
            </span>
          </button>
          <button
            onClick={delMolecule}
            disabled={pistonHeight <= minHeight}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Delete Height
            </span>
          </button>
        </div>
        <div ref={scene} />
      </div>
    </div>
  );
};

export default MatterScene;
