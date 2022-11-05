import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// styles
import * as g from "styles/globalStyles";

// components
import InputText from "components/input/text";

const commissionSchema = z.object({
  url: z.string().min(1, { message: "Required" }),
});

const AdminPorfolioForm = () => {
  const formMethods = useForm<z.infer<typeof commissionSchema>>({
    resolver: zodResolver(commissionSchema),
  });

  const { control, handleSubmit, watch } = formMethods;
  const url = watch("url");
  return (
    <form
      onSubmit={handleSubmit((data) => {
        //
      })}
    >
      <g.paper>
        <InputText
          control={control}
          placeholder="http://example.com/"
          label="Url da imagem"
          variant="outlined"
          name="url"
        />

        <img src={url} alt="" />
      </g.paper>
    </form>
  );
};

export default AdminPorfolioForm;
