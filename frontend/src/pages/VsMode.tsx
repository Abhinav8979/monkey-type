const VsMode = () => {
  return (
    <section className="flex items-center justify-center flex-col gap-16">
      <div className="text-bgColor flex justify-center items-center w-full gap-16 font-semibold">
        <div className="bg-textSecondary rounded-xl h-52 flex-1 flex items-center justify-center text-5xl">
          <h1>name1</h1>
        </div>

        <div className="flex justify-center items-center">
          <h1 className="text-textPrimary text-5xl md:text-9xl font-extrabold">
            VS
          </h1>
        </div>

        <div className="bg-textSecondary rounded-xl h-52  flex-1 flex items-center justify-center text-5xl">
          <h1>?</h1>
        </div>
      </div>
      <div>
        <button className="bg-bgButton w-[220px] rounded-xl p-4 text-bgColor font-bold">
          Find Player
        </button>
      </div>
      <div className="pr-20 flex-1">
        <p className="text-3xl text-textSecondary">
          Drive into the thrill of instant competition with out '1v1' mode!
          Challenge a random opponent to a head-to-head typing battle and put
          your skills to the test.
        </p>
      </div>
    </section>
  );
};

export default VsMode;
