import services from "service";
import { CreateAdminMerchSchema } from "service/admin/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";

// components
import InputText from "components/input/text";
import InputSwitch from "components/input/switch";
import InputCurrency from "components/input/currency";
import InputImage from "components/input/image";
import Button from "components/button";

const AdminStoreForm = ({
  onSubmit,
  loading,
  ...formProps
}: {
  onSubmit: SubmitHandler<CreateAdminMerchSchema>;
  loading?: boolean;
} & UseFormProps<CreateAdminMerchSchema>) => {
  const formMethods = useForm<CreateAdminMerchSchema>({
    resolver: zodResolver(services.admin.createAdminMerchSchema),
    ...formProps,
  });

  const { control, handleSubmit } = formMethods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <g.paper loading={loading}>
        <InputSwitch control={control} name="active" label="Ativo" />
        <InputText
          variant="outlined"
          control={control}
          name="url"
          label="Url da loja"
        />
        <InputText
          variant="outlined"
          control={control}
          name="name"
          label="Nome"
        />
        <InputCurrency control={control} name="price" label="Preco" />

        <InputImage
          variant="outlined"
          control={control}
          name="miniature"
          label="Url miniatura"
        >
          {(src) => src && <s.miniature src={src} alt="miniatura" />}
        </InputImage>
        <Button loading={loading} fullWidth>
          Criar
        </Button>
      </g.paper>
    </form>
  );
};

export default AdminStoreForm;
