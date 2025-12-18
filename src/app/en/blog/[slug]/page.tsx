import { Metadata } from 'next'
import { generatePageMetadata } from '../../../page-metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Blog posts data
const blogPosts: { [key: string]: { 
  title: string
  description: string
  date: string
  content: React.ReactNode
} } = {
  'potain-mdt-178-vs-mc-85-b-comparison': {
    title: 'Potain MDT 178 vs MC 85 B: Which Tower Crane is Right for Your Construction Project?',
    description: 'Compare Potain MDT 178 and MC 85 B tower cranes. Understand the differences between flat-top and top-slewing designs, capacity, jib length, and which model suits your construction project requirements.',
    date: '2024-01-15',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Selecting the right tower crane for your construction project requires understanding the key differences between models. The Potain MDT 178 and MC 85 B represent two distinct design philosophies: flat-top versus top-slewing configurations. This comparison examines their specifications, capabilities, and typical applications.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Design Philosophy: Flat-Top vs Top-Slewing</h2>
        <p className="text-neutral-700 mb-4">
          The Potain MDT 178 features a flat-top design, which eliminates the need for a counter-jib and reduces overall weight. This design typically offers easier transport and faster assembly compared to top-slewing models. The flat-top configuration can be advantageous for projects requiring multiple cranes working in close proximity.
        </p>
        <p className="text-neutral-700 mb-6">
          The Potain MC 85 B utilizes a top-slewing design with a traditional counter-jib. This configuration provides excellent stability and is well-suited for projects requiring consistent lifting operations. Top-slewing cranes generally offer precise control and are often preferred for projects with longer durations.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Capacity and Performance Specifications</h2>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MDT 178 Specifications</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximum Capacity:</strong> 8 tons</li>
            <li><strong>Maximum Jib Length:</strong> 60 meters</li>
            <li><strong>Design Type:</strong> Flat-top tower crane</li>
            <li><strong>Typical Applications:</strong> Medium to large construction projects, commercial buildings, infrastructure projects</li>
          </ul>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Potain MC 85 B Specifications</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Maximum Capacity:</strong> 5 tons</li>
            <li><strong>Maximum Jib Length:</strong> 52 meters</li>
            <li><strong>Design Type:</strong> Top-slewing tower crane</li>
            <li><strong>Typical Applications:</strong> Medium-sized construction projects, residential buildings, urban construction sites</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Key Differences</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Lifting Capacity</h3>
            <p className="text-neutral-700">
              The MDT 178 offers a higher maximum capacity of 8 tons compared to the MC 85 B's 5 tons. This difference can be significant for projects requiring heavier lifts or when working at maximum jib extension.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Reach and Coverage</h3>
            <p className="text-neutral-700">
              With a maximum jib length of 60 meters, the MDT 178 provides 8 meters more reach than the MC 85 B's 52-meter jib. This extended reach can reduce the need for repositioning the crane and improve coverage of larger construction sites.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Transport and Assembly</h3>
            <p className="text-neutral-700">
              Flat-top designs like the MDT 178 typically offer advantages in transport logistics due to reduced component weight and simplified assembly procedures. Top-slewing models like the MC 85 B may require more careful planning for transport but offer proven reliability.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Project Suitability Considerations</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Choose MDT 178 When:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Your project requires lifting capacities exceeding 5 tons</li>
              <li>You need maximum jib reach up to 60 meters</li>
              <li>Multiple cranes will operate in close proximity</li>
              <li>Faster assembly and disassembly are priorities</li>
              <li>Working on larger commercial or infrastructure projects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Choose MC 85 B When:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>Your project's maximum lift requirements are 5 tons or less</li>
              <li>52 meters of jib reach is sufficient for your site</li>
              <li>You prefer the stability and control of top-slewing design</li>
              <li>Working on medium-sized residential or commercial projects</li>
              <li>Compact site conditions require careful crane placement</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Operational Considerations</h2>
        <p className="text-neutral-700 mb-4">
          Both models are designed for reliable operation, but operational characteristics differ. The MDT 178's flat-top design may offer advantages in windy conditions due to reduced wind resistance. The MC 85 B's top-slewing configuration provides excellent precision for detailed lifting operations.
        </p>
        <p className="text-neutral-700 mb-6">
          Site conditions, project duration, and specific lifting requirements should guide your selection. Consider factors such as ground conditions, available space for assembly, and the types of materials you'll be lifting throughout the project lifecycle.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusion</h2>
        <p className="text-neutral-700 mb-6">
          The choice between Potain MDT 178 and MC 85 B depends on your specific project requirements. The MDT 178 offers greater capacity and reach, making it suitable for larger projects, while the MC 85 B provides reliable performance for medium-scale construction needs. Evaluate your project's lifting requirements, site constraints, and operational preferences to make an informed decision.
        </p>
      </>
    ),
  },
  'potain-mdt-series-specifications-guide': {
    title: 'Potain MDT Series Specifications: Complete Guide to Flat-Top Tower Cranes',
    description: 'Comprehensive guide to Potain MDT series flat-top tower cranes. Learn about MDT 178, MDT 189, MDT 219 J10, and MDT 268 J12 specifications, capacities, jib lengths, and technical features.',
    date: '2024-01-20',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          The Potain MDT series represents a range of flat-top tower cranes designed for modern construction projects. This guide provides detailed specifications and technical information about the MDT series models, helping construction professionals understand the capabilities and applications of these cranes.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Understanding Flat-Top Design</h2>
        <p className="text-neutral-700 mb-4">
          Flat-top tower cranes, as the name suggests, feature a design without a traditional counter-jib. This configuration offers several advantages including reduced weight, easier transport, and simplified assembly procedures. The absence of a counter-jib also allows for closer positioning of multiple cranes on construction sites.
        </p>
        <p className="text-neutral-700 mb-6">
          The MDT series utilizes this flat-top design philosophy to provide efficient lifting solutions across various construction applications, from residential buildings to large-scale commercial and infrastructure projects.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Series Models Overview</h2>
        
        <div className="space-y-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 178</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximum Capacity:</strong> 8 tons</li>
              <li><strong>Maximum Jib Length:</strong> 60 meters</li>
              <li><strong>Design:</strong> Flat-top tower crane</li>
              <li><strong>Typical Use:</strong> Versatile crane suitable for a wide range of construction projects. Designed for ease of transport, assembly, and operation.</li>
              <li><strong>Key Features:</strong> Excellent lift capacities and reach, making it ideal for various construction applications</li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 189</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximum Capacity:</strong> 8 tons</li>
              <li><strong>Maximum Jib Length:</strong> 60 meters</li>
              <li><strong>Design:</strong> Flat-top tower crane</li>
              <li><strong>Typical Use:</strong> Delivers exceptional performance with innovative flat-top design. Offers superior lifting capacity and ease of assembly.</li>
              <li><strong>Key Features:</strong> Robust performance characteristics, suitable for projects requiring reliable lifting operations</li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 219 J10</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximum Capacity:</strong> 10 tons</li>
              <li><strong>Maximum Jib Length:</strong> 65 meters</li>
              <li><strong>Design:</strong> Flat-top tower crane</li>
              <li><strong>Typical Use:</strong> Powerful tower crane for heavy-duty projects. Combines robust lifting capacity with advanced technology.</li>
              <li><strong>Key Features:</strong> Superior reach and capacity, designed for optimal performance in demanding construction environments</li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Potain MDT 268 J12</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Maximum Capacity:</strong> 12 tons</li>
              <li><strong>Maximum Jib Length:</strong> 75 meters</li>
              <li><strong>Design:</strong> Flat-top tower crane</li>
              <li><strong>Typical Use:</strong> Premium flat-top tower crane with exceptional capacity. Designed for the most demanding construction projects.</li>
              <li><strong>Key Features:</strong> Maximum efficiency and capacity, suitable for large-scale commercial and infrastructure projects</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Capacity and Reach Comparison</h2>
        <p className="text-neutral-700 mb-4">
          The MDT series offers a range of capacities from 8 to 12 tons, allowing selection based on project requirements. Capacity ratings represent the maximum weight that can be lifted, typically at the minimum jib extension. As the load moves further along the jib, the capacity decreases according to the crane's load chart.
        </p>
        <p className="text-neutral-700 mb-6">
          Jib lengths range from 60 to 75 meters across the series, providing flexibility for different site sizes and coverage requirements. Longer jib lengths enable coverage of larger construction areas without repositioning the crane.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Technical Characteristics</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Transport and Assembly</h3>
            <p className="text-neutral-700">
              Flat-top designs typically offer advantages in transport logistics. The absence of a counter-jib reduces component weight and simplifies loading procedures. Assembly procedures are generally streamlined compared to traditional top-slewing designs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Wind Resistance</h3>
            <p className="text-neutral-700">
              The flat-top configuration can offer improved wind resistance characteristics compared to traditional designs. This can be advantageous in areas with consistent wind conditions or when operating at greater heights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Site Configuration</h3>
            <p className="text-neutral-700">
              The flat-top design allows for closer positioning of multiple cranes, which can be beneficial on large construction sites requiring multiple lifting points. This configuration reduces interference between adjacent cranes.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Application Guidelines</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">MDT 178 and MDT 189</h3>
            <p className="text-neutral-700">
              These models are well-suited for medium to large construction projects including commercial buildings, residential complexes, and infrastructure projects. Their 8-ton capacity and 60-meter jib length provide versatility for various applications.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">MDT 219 J10</h3>
            <p className="text-neutral-700">
              With 10 tons capacity and 65 meters of reach, this model is designed for heavy-duty projects requiring higher lifting capacities. Suitable for large commercial buildings, industrial facilities, and major infrastructure projects.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">MDT 268 J12</h3>
            <p className="text-neutral-700">
              The largest model in the series, with 12 tons capacity and 75 meters jib length, is designed for the most demanding construction projects. Ideal for large-scale commercial developments, high-rise buildings, and major infrastructure projects requiring maximum lifting capacity and reach.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Selection Considerations</h2>
        <p className="text-neutral-700 mb-4">
          When selecting an MDT series crane, consider your project's maximum lifting requirements, site size, and operational needs. Review load charts carefully to ensure the selected model can handle your specific lifting scenarios, especially when working at maximum jib extension.
        </p>
        <p className="text-neutral-700 mb-6">
          Site conditions, ground bearing capacity, and available space for assembly should also factor into your decision. Consult with qualified professionals to ensure proper crane selection and installation planning.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusion</h2>
        <p className="text-neutral-700 mb-6">
          The Potain MDT series offers a comprehensive range of flat-top tower cranes suitable for various construction applications. From the versatile MDT 178 to the high-capacity MDT 268 J12, these models provide construction professionals with options to match their specific project requirements. Understanding the specifications and capabilities of each model enables informed decision-making for construction projects.
        </p>
      </>
    ),
  },
  'how-to-choose-right-potain-tower-crane': {
    title: 'How to Choose the Right Potain Tower Crane: Capacity, Jib Length, and Project Requirements',
    description: 'Learn how to select the right Potain tower crane for your construction project. Understand capacity requirements, jib length calculations, project specifications, and key selection factors.',
    date: '2024-01-25',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Selecting the appropriate tower crane for a construction project requires careful evaluation of multiple factors. This guide outlines the key considerations when choosing a Potain tower crane, focusing on capacity requirements, jib length, and project-specific needs.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Understanding Capacity Requirements</h2>
        <p className="text-neutral-700 mb-4">
          Tower crane capacity refers to the maximum weight the crane can lift. However, this capacity varies depending on the jib extension and load position. A crane rated for 8 tons maximum capacity may only lift 2 tons at maximum jib extension.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-neutral-700">
            <strong>Important:</strong> Always consult the crane's load chart to determine actual lifting capacity at your required jib extension. The load chart shows how capacity decreases as the load moves further from the mast.
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">Calculating Your Capacity Needs</h3>
        <ol className="list-decimal list-inside space-y-3 text-neutral-700 mb-6 ml-4">
          <li><strong>Identify the heaviest loads:</strong> Determine the maximum weight you'll need to lift, including materials, formwork, and equipment.</li>
          <li><strong>Consider safety margins:</strong> Add a safety factor to your calculations. Industry standards typically recommend maintaining capacity well below maximum ratings.</li>
          <li><strong>Account for lifting accessories:</strong> Include the weight of slings, hooks, and other lifting equipment in your calculations.</li>
          <li><strong>Review load charts:</strong> Check the crane's load chart to ensure it can handle your requirements at the required jib extension.</li>
        </ol>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Determining Jib Length Requirements</h2>
        <p className="text-neutral-700 mb-4">
          Jib length determines the crane's reach and coverage area. Selecting the appropriate jib length ensures the crane can access all required lifting points without repositioning.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Factors Affecting Jib Length Selection</h3>
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Site Dimensions</h4>
            <p className="text-neutral-700">
              Measure your construction site's dimensions and identify the furthest points where lifting operations will occur. The jib length must be sufficient to reach these points from the crane's planned position.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Crane Positioning</h4>
            <p className="text-neutral-700">
              Consider where the crane can be positioned on your site. Factors such as ground conditions, access routes, and building layout affect optimal crane placement. A centrally positioned crane may require less jib length than one positioned at the site perimeter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Building Height</h4>
            <p className="text-neutral-700">
              Taller buildings may require longer jib lengths to maintain adequate clearance and reach upper floors effectively. Consider both horizontal reach and vertical clearance requirements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Multiple Lifting Points</h4>
            <p className="text-neutral-700">
              If your project requires lifting materials to various locations across the site, ensure the selected jib length can cover all necessary areas without frequent repositioning.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Project-Specific Considerations</h2>
        
        <div className="space-y-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Project Type</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Residential Buildings:</strong> Typically require cranes with 5-8 ton capacity and 50-60 meter jib lengths</li>
              <li><strong>Commercial Buildings:</strong> Often need 8-10 ton capacity and 60-65 meter jib lengths</li>
              <li><strong>Infrastructure Projects:</strong> May require 10-12 ton capacity and 65-75 meter jib lengths</li>
              <li><strong>Industrial Facilities:</strong> Can require specialized cranes with higher capacities depending on equipment installation needs</li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Project Duration</h3>
            <p className="text-neutral-700 mb-3">
              Longer projects may benefit from purchasing a crane, while shorter projects might be better suited for rental arrangements. Consider the total project timeline and frequency of crane usage.
            </p>
            <p className="text-neutral-700">
              For projects lasting several months or years, owning a crane may provide cost advantages. For shorter projects or one-time needs, rental options may be more economical.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Site Constraints</h3>
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Space Limitations:</strong> Compact sites may require cranes with smaller footprints or specific configurations</li>
              <li><strong>Access Routes:</strong> Consider how the crane will be delivered and assembled given site access limitations</li>
              <li><strong>Ground Conditions:</strong> Evaluate ground bearing capacity and stability requirements for crane foundation</li>
              <li><strong>Adjacent Structures:</strong> Consider clearance requirements from existing buildings, power lines, or other obstacles</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Design Type Selection: Flat-Top vs Top-Slewing</h2>
        <p className="text-neutral-700 mb-4">
          Potain offers both flat-top (MDT/MCT series) and top-slewing (MC series) designs. Each has distinct characteristics:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Flat-Top Design (MDT/MCT)</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Reduced weight and easier transport</li>
              <li>• Faster assembly procedures</li>
              <li>• Better for multiple cranes in close proximity</li>
              <li>• Typically lower wind resistance</li>
              <li>• Suitable for various project types</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Top-Slewing Design (MC)</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Traditional design with proven reliability</li>
              <li>• Excellent stability and control</li>
              <li>• Precise lifting operations</li>
              <li>• Well-suited for longer-duration projects</li>
              <li>• Established maintenance procedures</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Selection Checklist</h2>
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <p className="text-neutral-700 mb-4">Use this checklist when evaluating tower crane options:</p>
          <ul className="space-y-2 text-neutral-700">
            <li>□ Maximum lifting capacity requirements identified</li>
            <li>□ Required jib length calculated based on site dimensions</li>
            <li>□ Load charts reviewed for capacity at required jib extension</li>
            <li>□ Site constraints and access routes evaluated</li>
            <li>□ Ground conditions and foundation requirements assessed</li>
            <li>□ Project duration and usage frequency considered</li>
            <li>□ Design type (flat-top vs top-slewing) selected</li>
            <li>□ Safety margins and operational factors accounted for</li>
            <li>□ Qualified professionals consulted for technical evaluation</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Common Selection Mistakes to Avoid</h2>
        <div className="space-y-3 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Underestimating Capacity Needs</h3>
            <p className="text-neutral-700">
              Failing to account for all load weights, including lifting accessories and safety margins, can lead to selecting an undersized crane.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ignoring Load Charts</h3>
            <p className="text-neutral-700">
              Maximum capacity ratings only apply at minimum jib extension. Always verify capacity at your required working radius.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Insufficient Jib Length</h3>
            <p className="text-neutral-700">
              Selecting a jib that's too short may require frequent crane repositioning, increasing project costs and timeline.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Overlooking Site Constraints</h3>
            <p className="text-neutral-700">
              Failing to consider access routes, ground conditions, and space limitations can result in installation difficulties or additional costs.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusion</h2>
        <p className="text-neutral-700 mb-6">
          Choosing the right Potain tower crane requires careful analysis of capacity requirements, jib length needs, and project-specific factors. By systematically evaluating these elements and consulting load charts, construction professionals can select cranes that meet their project requirements while maintaining safety margins and operational efficiency. Always consult with qualified professionals to ensure proper crane selection and installation planning.
        </p>
      </>
    ),
  },
  'potain-mc-vs-mdt-vs-mct-series-differences': {
    title: 'Potain MC vs MDT vs MCT Series: Understanding the Differences and Best Use Cases',
    description: 'Compare Potain MC, MDT, and MCT tower crane series. Learn the differences between top-slewing and flat-top designs, capacity ranges, and which series suits different construction project types.',
    date: '2024-01-30',
    content: (
      <>
        <p className="text-lg text-neutral-700 mb-6">
          Potain manufactures three main tower crane series: MC (top-slewing), MDT (flat-top), and MCT (compact flat-top). Understanding the differences between these series helps construction professionals select the most appropriate crane for their specific project requirements.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Series Overview</h2>
        <p className="text-neutral-700 mb-6">
          Each series represents a different design philosophy and application focus. The MC series features traditional top-slewing designs, while MDT and MCT series utilize flat-top configurations with varying emphasis on capacity and compactness.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MC Series: Top-Slewing Design</h2>
        <p className="text-neutral-700 mb-4">
          The Potain MC series represents traditional top-slewing tower cranes with counter-jibs. These cranes feature the classic tower crane design with the slewing mechanism located at the top of the mast.
        </p>

        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MC Series Characteristics</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design Type:</strong> Top-slewing with counter-jib</li>
            <li><strong>Typical Models:</strong> MC 85 B, MC 125, MC 175 B</li>
            <li><strong>Capacity Range:</strong> 5-8 tons</li>
            <li><strong>Jib Length Range:</strong> 52-60 meters</li>
            <li><strong>Key Features:</strong> Proven reliability, excellent stability, precise control</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">MC Series Advantages</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Traditional design with established track record</li>
          <li>Excellent stability due to counter-jib configuration</li>
          <li>Precise control for detailed lifting operations</li>
          <li>Well-suited for longer-duration projects</li>
          <li>Familiar maintenance procedures for operators</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">MC Series Best Use Cases</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Medium-sized construction projects</li>
          <li>Residential and commercial building construction</li>
          <li>Projects requiring consistent, precise lifting operations</li>
          <li>Longer-duration projects where reliability is paramount</li>
          <li>Sites where traditional crane design is preferred</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MDT Series: Flat-Top High-Capacity Design</h2>
        <p className="text-neutral-700 mb-4">
          The Potain MDT series features flat-top tower cranes designed for higher capacity applications. These cranes eliminate the counter-jib, resulting in reduced weight and simplified transport while maintaining high lifting capacities.
        </p>

        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MDT Series Characteristics</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design Type:</strong> Flat-top without counter-jib</li>
            <li><strong>Typical Models:</strong> MDT 178, MDT 189, MDT 219 J10, MDT 268 J12</li>
            <li><strong>Capacity Range:</strong> 8-12 tons</li>
            <li><strong>Jib Length Range:</strong> 60-75 meters</li>
            <li><strong>Key Features:</strong> High capacity, extended reach, easier transport</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">MDT Series Advantages</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Higher lifting capacities compared to MC series</li>
          <li>Extended jib lengths for larger coverage areas</li>
          <li>Reduced weight facilitates easier transport</li>
          <li>Faster assembly procedures</li>
          <li>Better suited for multiple cranes in close proximity</li>
          <li>Improved wind resistance characteristics</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">MDT Series Best Use Cases</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Large commercial buildings and high-rise construction</li>
          <li>Infrastructure projects requiring high capacity</li>
          <li>Projects needing extended jib reach</li>
          <li>Sites requiring multiple cranes</li>
          <li>Projects where transport efficiency is important</li>
          <li>Heavy-duty construction applications</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">MCT Series: Compact Flat-Top Design</h2>
        <p className="text-neutral-700 mb-4">
          The Potain MCT series combines flat-top design with compact dimensions, making these cranes ideal for space-constrained construction sites while maintaining the benefits of flat-top configuration.
        </p>

        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">MCT Series Characteristics</h3>
          <ul className="space-y-2 text-neutral-700">
            <li><strong>Design Type:</strong> Compact flat-top</li>
            <li><strong>Typical Models:</strong> MCT 88, MCT 135</li>
            <li><strong>Capacity Range:</strong> 5-6 tons</li>
            <li><strong>Jib Length Range:</strong> 50-52 meters</li>
            <li><strong>Key Features:</strong> Compact footprint, quick setup, urban construction focus</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">MCT Series Advantages</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Compact design for space-constrained sites</li>
          <li>Quick setup and assembly</li>
          <li>Excellent flexibility for urban construction</li>
          <li>Flat-top benefits with smaller footprint</li>
          <li>Ideal for projects with limited access</li>
          <li>Efficient for projects requiring frequent relocation</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">MCT Series Best Use Cases</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6 ml-4">
          <li>Urban construction projects with space limitations</li>
          <li>Residential construction in developed areas</li>
          <li>Projects requiring quick setup and teardown</li>
          <li>Sites with restricted access routes</li>
          <li>Medium-capacity lifting requirements</li>
          <li>Projects where compact footprint is essential</li>
        </ul>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Direct Comparison Table</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-neutral-300">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">Feature</th>
                <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">MC Series</th>
                <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">MDT Series</th>
                <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">MCT Series</th>
              </tr>
            </thead>
            <tbody className="text-neutral-700">
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Design</td>
                <td className="border border-neutral-300 px-4 py-3">Top-slewing</td>
                <td className="border border-neutral-300 px-4 py-3">Flat-top</td>
                <td className="border border-neutral-300 px-4 py-3">Compact flat-top</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Capacity Range</td>
                <td className="border border-neutral-300 px-4 py-3">5-8 tons</td>
                <td className="border border-neutral-300 px-4 py-3">8-12 tons</td>
                <td className="border border-neutral-300 px-4 py-3">5-6 tons</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Jib Length</td>
                <td className="border border-neutral-300 px-4 py-3">52-60 meters</td>
                <td className="border border-neutral-300 px-4 py-3">60-75 meters</td>
                <td className="border border-neutral-300 px-4 py-3">50-52 meters</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Transport</td>
                <td className="border border-neutral-300 px-4 py-3">Standard</td>
                <td className="border border-neutral-300 px-4 py-3">Easier (reduced weight)</td>
                <td className="border border-neutral-300 px-4 py-3">Easiest (compact)</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Assembly</td>
                <td className="border border-neutral-300 px-4 py-3">Standard</td>
                <td className="border border-neutral-300 px-4 py-3">Faster</td>
                <td className="border border-neutral-300 px-4 py-3">Fastest</td>
              </tr>
              <tr>
                <td className="border border-neutral-300 px-4 py-3 font-medium">Best For</td>
                <td className="border border-neutral-300 px-4 py-3">Medium projects, reliability</td>
                <td className="border border-neutral-300 px-4 py-3">Large projects, high capacity</td>
                <td className="border border-neutral-300 px-4 py-3">Urban projects, space constraints</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Selection Guidelines</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Choose MC Series When:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>You need 5-8 tons capacity and 52-60 meters jib length</li>
              <li>Project requires proven reliability and stability</li>
              <li>Precise control is essential for detailed operations</li>
              <li>Project duration is longer-term</li>
              <li>Traditional design is preferred or required</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Choose MDT Series When:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>You need 8-12 tons capacity and 60-75 meters jib length</li>
              <li>Project requires high lifting capacity</li>
              <li>Extended reach is necessary for large sites</li>
              <li>Multiple cranes will operate in close proximity</li>
              <li>Transport efficiency is important</li>
              <li>Working on large commercial or infrastructure projects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Choose MCT Series When:</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
              <li>You need 5-6 tons capacity and 50-52 meters jib length</li>
              <li>Site has space constraints or limited access</li>
              <li>Quick setup and teardown are priorities</li>
              <li>Working in urban environments</li>
              <li>Compact footprint is essential</li>
              <li>Project requires frequent crane relocation</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Operational Considerations</h2>
        <p className="text-neutral-700 mb-4">
          Beyond capacity and reach, consider operational factors when selecting between series. MC series cranes offer traditional operation familiar to most operators, while MDT and MCT series provide modern flat-top benefits but may require familiarization with different operational characteristics.
        </p>
        <p className="text-neutral-700 mb-6">
          Maintenance requirements, spare parts availability, and operator training should also factor into your decision. Each series has established maintenance procedures, but flat-top designs may offer simplified maintenance due to reduced component complexity.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Conclusion</h2>
        <p className="text-neutral-700 mb-6">
          The Potain MC, MDT, and MCT series each serve distinct construction needs. MC series provides reliable top-slewing performance for medium projects, MDT series offers high-capacity flat-top solutions for large projects, and MCT series delivers compact flat-top options for space-constrained sites. Understanding these differences enables construction professionals to select the most appropriate series based on project requirements, site conditions, and operational needs.
        </p>
      </>
    ),
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | NIBM Tower Cranes',
      description: 'The requested blog post could not be found.',
    }
  }

  const baseMetadata: Metadata = {
    title: `${post.title} | NIBM Tower Cranes Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.nibmvb.eu/en/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: 'https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['https://www.nibmvb.eu/images/optimized/cropped-Top-page2-potain6.webp'],
    },
  }

  return generatePageMetadata(
    baseMetadata,
    `/en/blog/${params.slug}`,
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    notFound()
  }

  return (
    <article className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              {post.title}
            </h1>
            <time className="text-neutral-500 text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>
          
          <div className="prose prose-lg max-w-none text-neutral-700">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  )
}
