export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(
      `http://192.168.0.48:5016/api/tutors/${userId}/profile`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    return data; // Return the profile data
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null; // Handle errors or return null
  }
};
