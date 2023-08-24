const backendUrl: string = process.env.REACT_APP_BACKEND_URL as string;

export async function registerUserProfile(username: string, password: string): Promise<number | undefined> {
  const url = `${backendUrl}/api/user/register?username=${username}&password=${password}`;

  try {
    const response = await fetch(url, {
      method: "POST",
    });

    if (response.status === 400) {
      throw new Error(await response.text());
    } else if (!response.ok) {
      throw new Error("Network Error");
    }

    return response.status;
  } catch (error) {
    if (String(error) === "TypeError: Failed to fetch") {
      return 500;
    } else if (String(error) === "Error: Username already taken.") {
      return 400;
    } else if (String(error) === "Error: Inappropriate username.") {
      return 401;
    }
  }
}

export async function submitUserScore(userScore: BlitzScore): Promise<number | undefined> {
  const url = `${backendUrl}/api/score/submit`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userScore),
    });

    if (!response.ok) {
      throw new Error("Server Error when trying to submit score...");
    }

    return response.status;
  } catch (error) {
    alert(error);
  }
}

export async function fetchUserProfile(username: string, password: string) {
  try {
    const response = await fetch(`${backendUrl}/api/user/profile?username=${username}&password=${password}`);

    if (response.status === 400) {
      return 400;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return 500;
  }
}

export async function getTopTotalScore() {
  try {
    const response = await fetch(`${backendUrl}/api/user/top`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not retrieve top total scores");
    }

    return data;
  } catch (error) {
    return null;
  }
}

export async function getUserLocalScores(userId: number | null) {
  try {
    const response = await fetch(`${backendUrl}/api/score/local?userId=${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not retrieve user local scores");
    }

    return data;
  } catch (error) {
    return null;
  }
}

export async function getUserTotalScore(userId: number | null) {
  try {
    const response = await fetch(`${backendUrl}/api/user/total?userId=${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not retrieve user total score");
    }

    return data;
  } catch (error) {
    return null;
  }
}

export async function getTopScores() {
  try {
    const response = await fetch(`${backendUrl}/api/score/top`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not retrieve top scores");
    }

    return data;
  } catch (error) {
    return null;
  }
}

interface BlitzScore {
  scoreStreak: number;
  scorePoints: number;
  scoreMod: string | null;
  userId: number | null;
  username: string | null;
}
