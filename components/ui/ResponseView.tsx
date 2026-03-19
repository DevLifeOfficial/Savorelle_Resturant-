type RecipeResponse = {
  type?: "recipe" | "location";
  recipe_name?: string;
  ingredients?: string[];
  steps?: string[];
  cooking_time?: string;
  difficulty?: string;
  famous_foods?: string[];
  error?: string;
};

export default function ResponseView({ data }: { data: RecipeResponse }) {
  if (!data) return null;

  if (data.error) {
    return <p className="text-red-500">❌ {data.error}</p>;
  }

  if (data.type === "recipe") {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-bold">🍽️ {data.recipe_name}</h3>

        <p className="text-sm text-gray-600">
          ⏱ {data.cooking_time} • 🔥 {data.difficulty}
        </p>

        <div>
          <p className="font-semibold">🧂 Ingredients:</p>
          <ul className="list-disc ml-5 text-sm">
            {data.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold">👨‍🍳 Steps:</p>
          <ol className="list-decimal ml-5 text-sm">
            {data.steps?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  if (data.type === "location") {
    return (
      <div>
        <h3 className="font-bold">🌍 Famous Foods</h3>
        <ul className="list-disc ml-5 text-sm">
          {data.famous_foods?.map((food, i) => (
            <li key={i}>{food}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <pre className="text-xs bg-gray-100 p-2 rounded">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
