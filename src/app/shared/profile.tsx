import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';

const AuthorProfilePage = () => {
  return (
    <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex flex-col items-center justify-center">
        <Avatar
          size="xl"
          image={authorData?.avatar?.thumbnail}
          alt="Author"
          className="mx-auto dark:border-gray-500"
        />
        <h2 className="mt-5 text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
          {authorData?.name}
        </h2>
        <Profile />
      </div>
    </div>
  );
};

export default AuthorProfilePage;
