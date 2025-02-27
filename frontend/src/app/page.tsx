
export default function Home() {
  return (
    <div className="body-container">

      <section>
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">

          <h1 className="text-3xl font-bold text-gray-800">Streak Tracker</h1>
          <p className="text-gray-600 mt-2">Track your progress daily and stay consistent!</p>

          <div className="mt-6">
            <ul className="space-y-3">
              {[1, 2, 3].map((id) => (
                <li key={id}>
                  <a
                    href={`/home/${id}`}
                    className="block w-full py-3 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md 
                             hover:bg-yellow-600 transition-all"
                  >
                    View Streak {id}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
