import { CreateProfileSchema } from "service/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import services from "service";

// styles
import * as g from "styles/globalStyles";

// components
import InputText from "components/input/text";
import InputImage from "components/input/image";
import UserAvatar from "components/user/avatar";
import { Banner } from "components/artist/header";
import Button from "components/button";

interface Props extends UseFormProps<CreateProfileSchema> {
  onSubmit: SubmitHandler<CreateProfileSchema>;
  loading?: boolean;
}

const MyProfileForm = ({ onSubmit, loading, ...formProps }: Props) => {
  const formMethods = useForm<CreateProfileSchema>({
    resolver: zodResolver(services.profileSchema),
    ...formProps,
  });

  const { control, handleSubmit } = formMethods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <g.paper loading={loading}>
        <InputText
          control={control}
          name="discord"
          variant="outlined"
          label="Discord *"
        />
        <InputText
          control={control}
          name="twitter"
          variant="outlined"
          label="Twitter *"
        />
        <InputText
          control={control}
          name="userName"
          variant="outlined"
          label="Nome de usuario *"
        />
        <InputImage
          control={control}
          name="profilePicture"
          variant="outlined"
          label="Foto de perfil *"
          placeholder="link da foto de perfil..."
        >
          {(src) => (
            <UserAvatar
              size="large"
              src={src ?? "https://placewaifu.com/image/80/80"}
              alt=""
            />
          )}
        </InputImage>
        <InputImage
          control={control}
          name="banner"
          variant="outlined"
          label="Banner *"
          placeholder="link do banner..."
        >
          {(src) => (
            <Banner
              noMargin
              src={src ?? "https://placewaifu.com/image/1500/500"}
              alt=""
            />
          )}
        </InputImage>
        <Button loading={loading} type="submit" fullWidth={false}>
          Salvar
        </Button>
      </g.paper>
    </form>
  );
};

export default MyProfileForm;
