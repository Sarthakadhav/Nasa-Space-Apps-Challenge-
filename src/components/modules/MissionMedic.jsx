import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { MEDICAL_PROTOCOLS, OFFLINE_DIAGNOSTIC_FLOWS } from '../../data/mockProtocols';

export const MissionMedic = () => {
  const { crew, selectedAstronaut, setSelectedAstronautId } = useMission();
  const [selectedProtocolId, setSelectedProtocolId] = useState('SOP-FATIGUE-01');
  const [symptomAnswers, setSymptomAnswers] = useState({
    q1: 'Less than 4 hours',
    q2: 'Mild headache & eye strain',
    q3: 'Yes - High Risk Duties Imminent'
  });
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [savedActionNotes, setSavedActionNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const activeProtocol = MEDICAL_PROTOCOLS.find(p => p.id === selectedProtocolId) || MEDICAL_PROTOCOLS[0];

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  const handleRecordAction = (e) => {
    e.preventDefault();
    if (!savedActionNotes.trim()) return;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    setSavedActionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#24252a] gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Module 5 – Clinical Autonomy
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
            Mission Medic: Offline Assistant
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Step-by-step health emergency guides that work completely offline, even when there is no internet or Earth connection.
          </p>
        </div>

        {/* Patient Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Patient:</span>
          <select
            value={selectedAstronaut.id}
            onChange={(e) => setSelectedAstronautId(e.target.value)}
            className="bg-white dark:bg-[#1a1b1f] px-3 py-1.5 rounded-lg text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-[#333]"
          >
            {crew.map(ast => (
              <option key={ast.id} value={ast.id}>
                {ast.name} ({ast.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Diagnosis Card */}
      <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-start space-x-3.5">
          <img
            src={selectedAstronaut.photo}
            alt={selectedAstronaut.name}
            className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-[#333]"
          />
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Offline Clinical Evaluation
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              Assessment for {selectedAstronaut.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              {selectedAstronaut.id === 'AST-01' ? (
                <span>
                  High Fatigue & Sleep Shortage: Elena is missing over 6.4 hours of sleep from long shifts. 
                  Her resting heart rate is slightly elevated at 84 bpm (normal is 64 bpm), and her recovery speed is down. 
                  Because her reaction time is 185ms slower than usual, having a crewmate cover her complex duties and taking a rest break is strongly advised.
                </span>
              ) : (
                <span>
                  All vitals are normal and healthy: Good heart rate, clear oxygen levels, and sharp reaction times. 
                  Fully ready for normal spaceflight activities.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50 dark:border-[#24252a]">
          {MEDICAL_PROTOCOLS.map(proto => (
            <button
              key={proto.id}
              onClick={() => setSelectedProtocolId(proto.id)}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                selectedProtocolId === proto.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium'
                  : 'bg-gray-50 text-gray-600 dark:bg-[#202126] dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {proto.id}: {proto.title.split(' ')[0]} {proto.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Protocol Checklist & Symptoms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOP Steps */}
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Step-by-Step Action Guide
            </span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              {activeProtocol.title}
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              Trigger: {activeProtocol.triggerCriteria}
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            {activeProtocol.steps.map(s => {
              const isChecked = completedSteps.includes(s.step);
              return (
                <div
                  key={s.step}
                  onClick={() => toggleStep(s.step)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-gray-50 dark:bg-[#202126] border-gray-200 dark:border-[#333]'
                      : 'bg-white dark:bg-[#1a1b1f] border-gray-100 dark:border-[#26272c]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'border-gray-300 dark:border-neutral-600'
                    }`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">
                        Step {s.step}: {s.actionRequired}
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {s.instruction}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Symptoms Q&A and Action Logging */}
        <div className="bg-white dark:bg-[#1a1b1f] border border-gray-100 dark:border-[#27282e] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Crew Self-Reporting
            </span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
              Quick Health Check-In
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {OFFLINE_DIAGNOSTIC_FLOWS.fatigue.questions.map(q => (
              <div key={q.id} className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#202126] space-y-2">
                <span className="font-medium text-gray-900 dark:text-gray-100 block">
                  {q.text}
                </span>
                <div className="space-y-1">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={symptomAnswers[q.id] === opt}
                        onChange={() => setSymptomAnswers(prev => ({ ...prev, [q.id]: opt }))}
                        className="text-neutral-900 focus:ring-0"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleRecordAction} className="pt-2 border-t border-gray-50 dark:border-[#24252a] space-y-2">
            <label className="text-xs font-medium text-gray-800 dark:text-gray-200 block">
              Record Follow-Up Action:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={savedActionNotes}
                onChange={(e) => setSavedActionNotes(e.target.value)}
                placeholder="e.g. Took a 20-minute rest break, drank water, re-checked pulse..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#202126] border border-gray-200 dark:border-[#333] text-xs focus:outline-none focus:border-neutral-900 text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 transition-colors shrink-0"
              >
                Log Entry
              </button>
            </div>
            {isSaved && (
              <span className="text-xs text-emerald-700 dark:text-emerald-400 block">
                ✓ Saved safely on your local device. (Will sync with Earth when signal returns).
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
