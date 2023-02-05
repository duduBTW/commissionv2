import { CommissionSchema } from "service/admin/commission";
import services from "service";

import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";

// components
import InputText from "components/input/text";
import InputCurrency from "components/input/currency";
import InputEditor from "components/input/editor";
import InputSwitch from "components/input/switch";

interface Props extends UseFormProps<CommissionSchema> {
  onSubmit: SubmitHandler<CommissionSchema>;
  loading?: boolean;
  submitLabel?: string;
}

const AdminCommissionForm = ({
  onSubmit,
  loading,
  submitLabel = "Criar",
  ...formProps
}: Props) => {
  const formMethods = useForm<CommissionSchema>({
    resolver: zodResolver(services.admin.commissionSchema),
    ...formProps,
  });

  const { control, handleSubmit } = formMethods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <g.paper loading={loading}>
        <InputSwitch control={control} name="active" label="Ativo" />
        <InputText
          control={control}
          name="name"
          variant="outlined"
          label="Nome *"
        />
        <InputCurrency control={control} name="price" label="Preco *" />
        <InputEditor control={control} name="description" label="Descricao *" />
        <s.submit_button fullWidth loading={loading} type="submit">
          {submitLabel}
        </s.submit_button>
      </g.paper>
    </form>
  );
};

export default AdminCommissionForm;
