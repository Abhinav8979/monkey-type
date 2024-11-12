const Typing = () => {
  return (
    <div
      id="game"
      className="relative h-[220px] overflow-hidden text-4xl leading-[55px] text-left"
    >
      <div id="words" className="text-textSecondary pl-[.5px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
        similique iste sit officia magni impedit natus repellat suscipit
        reprehenderit ex corrupti illum sunt nemo eaque labore cumque est
        laboriosam architecto, odit mollitia? Libero asperiores assumenda quae
        magnam maiores voluptates, minima dolore, voluptatem, sit aliquid
        mollitia voluptate inventore ab. Sint magni enim eius laudantium ut.
        Magnam laudantium reprehenderit veniam itaque dolorum?
      </div>
      <div
        id="cursor"
        className="w-[1.5px] h-[2rem] bg-bgCursorColor absolute top-[12px]  animate-blink"
      ></div>
    </div>
  );
};

export default Typing;
