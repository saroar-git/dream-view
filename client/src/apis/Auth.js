export const saveUser = user => {
      const loggedUser = {
            email: user?.email,
            image: user?.photoURL,
            name: user?.displayName,
            role: user?.role || 'student'
      };

      // Check if the user is already registered
      fetch('https://dream-view-server-kappa.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                  if (!data) {
                        // User is not registered, set the role as "student"
                        loggedUser.role = 'student';
                  }

                  // Save the user data
                  fetch('https://dream-view-server-kappa.vercel.app/users', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(loggedUser)
                  })
                        .then(result => result.json())
                        .then(() => { });
            });
};
