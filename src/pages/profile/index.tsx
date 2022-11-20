import services from "service";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";

// components
import ProfileLayout from "components/profile/layout";
import MyProfileForm from "components/profile/myProfile/form";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: profile } = services.useProfile();
  const { mutate: updateProfile, isLoading } = useMutation(
    services.updateProfile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [services.useSessionKey],
          exact: true,
        });
      },
    }
  );

  if (!profile) return <div>:(</div>;
  return (
    <ProfileLayout>
      <MyProfileForm
        loading={isLoading}
        defaultValues={profile}
        onSubmit={(d) => updateProfile(d)}
      />
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.useProfileKey],
    services.getProfile(context.req.headers)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProfilePage;
