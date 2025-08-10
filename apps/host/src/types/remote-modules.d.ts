// Module declarations for remote federation modules
// This tells TypeScript about modules that are loaded at runtime

declare module 'remote/UserCard' {
  import { ComponentType } from 'react';
  import { UserCardProps } from '@ui/contracts';

  const UserCard: ComponentType<UserCardProps>;
  export default UserCard;
}

declare module 'remote/FederatedPage' {
  import { ComponentType } from 'react';
  import { FederatedPageProps } from '@ui/contracts';

  const FederatedPage: ComponentType<FederatedPageProps>;
  export default FederatedPage;
}

declare module 'remote/RemoteApp' {
  import { ComponentType } from 'react';

  const RemoteApp: ComponentType;
  export default RemoteApp;
}
