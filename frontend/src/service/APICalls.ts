export async function registerUserProfile(username: string, password: string): Promise<number | undefined> {
  const url = `http://localhost:8080/api/user/register?username=${username}&password=${password}`;

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
      alert("Failed to connect to server");
    } else {
      alert(error);
    }
  }
}

export async function submitUserScore(userScore: BlitzScore): Promise<number | undefined> {
  const url = `http://localhost:8080/api/score/submit`;

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
    const response = await fetch(`http://localhost:8080/api/user/profile?username=${username}&password=${password}`);
    const data = await response.json();
    return data;
  } catch (error) {}
}

export async function getTopTotalScore() {
  try {
    const response = await fetch(`http://localhost:8080/api/user/top`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

export async function getUserLocalScores(userId: number | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/score/local?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

export async function getUserTotalScore(userId: number | null) {
  try {
    const response = await fetch(`http://localhost:8080/api/user/total?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

export async function getTopScores() {
  try {
    const response = await fetch(`http://localhost:8080/api/score/top`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

interface BlitzScore {
  scoreStreak: number;
  scorePoints: number;
  scoreMod: string | null;
  userId: number | null;
  username: string | null;
}
