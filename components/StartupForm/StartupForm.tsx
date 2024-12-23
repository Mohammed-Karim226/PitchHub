import ChartsAndInfo from "./ChartsAndInfo";
import FormDialog from "./FormDialog";

const StartupFormHeader = () => {
  return (
    <section className="flex flex-col gap-4 justify-start items-start p-6">
      <FormDialog />
      <ChartsAndInfo />
    </section>
  );
};

export default StartupFormHeader;
