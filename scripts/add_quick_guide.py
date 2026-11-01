import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

with open('src/components/modules/PersonalBaseline.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

target = '        {/* Feature Contribution Breakdown */}'
replacement = '''        {/* User-friendly explanation guide */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
          <span className="font-semibold shrink-0">💡 Quick Guide:</span>
          <span className="leading-relaxed">
            A positive score (+) means vitals are steady and within this astronaut's normal healthy range. 
            A negative score (−) means vitals differ from normal, showing early fatigue or physical stress before it becomes serious.
          </span>
        </div>

        {/* Feature Contribution Breakdown */}'''

if target in code:
    code = code.replace(target, replacement, 1)
    with open('src/components/modules/PersonalBaseline.jsx', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Added user-friendly quick guide to PersonalBaseline.jsx")
else:
    print("Target not found in PersonalBaseline.jsx")
