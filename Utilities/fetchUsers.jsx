const formatCollegeName = (name) => {
  const match = name.match(/^(.*?)\s+\((.*?)\)$/);
  return match ? match[1] : name; // Return just the name without state initials
};

export const fetchUsers = async ({ college = [], grade = [], major = [] } = {}, searchQuery = '') => {
  const params = new URLSearchParams();

  college.forEach(school => params.append('college', formatCollegeName(school)));
  grade.forEach(grade => params.append('grade', grade));
  major.forEach(major => params.append('major', major));

  if (searchQuery) {
    params.append('searchQuery', searchQuery);
  }
  
  console.log(`Fetching users with params: ${params}`);

  try {
    const response = await fetch(`http://192.168.0.48:5016/api/tutors/allUsers?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    console.log("Users List: ", users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array in case of error
  }
};
