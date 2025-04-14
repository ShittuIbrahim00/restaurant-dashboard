const PromoBanner = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow flex items-center justify-between">
      <div>
        <h4 className="text-lg font-semibold">Upgrade to Premium!</h4>
        <p className="mt-2">
          Get access to exclusive features and priority support for your
          restaurant dashboard. Upgrade today!
        </p>
      </div>
      <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow">
        Upgrade Now
      </button>
    </div>
  );
};

export default PromoBanner;
