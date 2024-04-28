export const getUserIcon = (prop: string) => {
  const icons: Record<string, string> = {
    firstname: "fa-solid fa-id-card",
    lastname: "fa-solid fa-id-card",
    username: "fa-solid fa-circle-user",
    email: "fa-solid fa-envelope",
    phone: "fa-solid fa-mobile-screen-button",
    gender: "fa-solid fa-venus-mars",
    old_password: "fa-solid fa-unlock-keyhole",
    new_password: "fa-solid fa-unlock-keyhole",
    repeat_new_password: "fa-solid fa-unlock-keyhole",
    address: "fa-solid fa-location-crosshairs",
    region: "fa-solid fa-earth-asia",
    province: "fa-solid fa-signs-post",
    district: "fa-solid fa-location-dot",
    sub_district: "fa-solid fa-location-dot",
  };

  return icons[prop];
};
