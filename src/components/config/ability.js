import { AbilityBuilder } from '@casl/ability';

function isUserAdmin(user) {
  return user;
}

export default AbilityBuilder.define({ isUserAdmin }, can => {
  can(['read', 'create'], 'all');
  can(['update', 'delete'], 'all', { is_admin: true });
});
