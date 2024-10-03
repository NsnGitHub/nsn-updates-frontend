const extractInitials = (displayName: string) => {
  const displayNames: string[] = displayName.split(" ");
  let initials = "";

  displayNames.forEach((name) => {
    initials += name.charAt(0);
  });

  return initials.slice(0, 3);
};

export default extractInitials;
