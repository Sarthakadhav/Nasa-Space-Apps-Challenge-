import React, { useState } from 'react';
import { useMission } from '../../context/MissionContext';
import { SIMULATED_EMERGENCY_SCENARIOS } from '../../data/mockInventory';

export const MedVault = () => {
  const { inventory } = useMission();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeScenarioId, setActiveScenarioId] = useState('SCENARIO-01');

  const categories = ['All', 'Pharmaceuticals', 'Critical Equipment', 'Wearable Hardware', 'Supplies'];

  const filteredInventory = selectedCategory === 'All'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const selectedScenario = SIMULATED_EMERGENCY_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATED_EMERGENCY_SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 4 – Mission Intelligence
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Medical Kit & Supplies
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Check medicines, emergency first-aid supplies, and equipment status. See what is in stock and what will be needed during an emergency.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#1e2025] p-1 rounded-lg border border-gray-100 dark:border-[#28292e] text-xs overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-[#15161a] text-gray-900 dark:text-white font-medium shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Emergency Scenario Box */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-50 dark:border-[#24252a] gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Contingency Planning
            </span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              Emergency Supply Calculator (What-If Scenarios)
            </h3>
          </div>

          <div className="flex items-center space-x-1.5 text-xs">
            {SIMULATED_EMERGENCY_SCENARIOS.map(sc => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeScenarioId === sc.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {sc.name.split(' ')[1] || sc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-2 text-xs">
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
              {selectedScenario.name}
            </span>
            <span className="text-gray-500">
              Recovery Forecast: <strong>{selectedScenario.predictedRecoveryHours} hours</strong>
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedScenario.description}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="text-gray-400">Required:</span>
            {selectedScenario.requiredSupplies.map((req, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-[#15161a] border border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300">
                {req.item} ({req.qty})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Med Vault Stowage Inventory
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Tracking {filteredInventory.length} classified items in habitat lockers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-50 dark:border-[#24252a] text-[11px]">
                <th className="pb-3 font-normal">Item</th>
                <th className="pb-3 font-normal">Category</th>
                <th className="pb-3 font-normal">In Stock</th>
                <th className="pb-3 font-normal">Expires In</th>
                <th className="pb-3 font-normal">Radiation Shielding</th>
                <th className="pb-3 font-normal">Storage Locker</th>
                <th className="pb-3 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#24252a]">
              {filteredInventory.map(item => {
                const isLow = item.stock <= item.minSafeStock;
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#202126]">
                    <td className="py-3">
                      <span className="font-medium text-gray-900 dark:text-gray-100 block">
                        {item.name}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {item.indication}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">
                      {item.category}
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${isLow ? 'text-amber-600' : 'text-gray-900 dark:text-gray-100'}`}>
                        {item.stock} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">
                      {item.shelfLifeDays} days
                    </td>
                    <td className="py-3 text-gray-400">
                      {item.radiationDegradationRate || 'Hardened'}
                    </td>
                    <td className="py-3 text-gray-500">
                      {item.location}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        isLow
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-gray-50 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
