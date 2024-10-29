export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(
      `http://172.20.20.20:5016/api/tutors/${userId}/profile`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null; 
  }
};
