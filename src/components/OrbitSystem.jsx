/* ============================================================
   Elegant orbital system for the ritual section-2 background.
   A glowing central planet with thin orbit rings and small
   moons revolving at different speeds. Meant to be placed off
   to the right, overflowing into the empty space. Light but
   visible, in the ritual colour, behind the content.
   ============================================================ */

export default function OrbitSystem({ accent, style }) {
  return (
    <div className="orbit-system" style={{ ...style, "--accent": accent }} aria-hidden="true">
      <div className="orbit-ring orbit-ring--outer" />
      <div className="orbit-ring orbit-ring--dotted" />
      <div className="orbit-ring orbit-ring--mid" />
      <div className="orbit-ring orbit-ring--inner" />
      <div className="orbit-planet" />
      <div className="orbit-rotor orbit-rotor--outer">
        <span className="orbit-body" />
      </div>
      <div className="orbit-rotor orbit-rotor--dotted">
        <span className="orbit-body orbit-body--sm" />
      </div>
      <div className="orbit-rotor orbit-rotor--mid">
        <span className="orbit-body orbit-body--sm" />
      </div>
      <div className="orbit-rotor orbit-rotor--inner">
        <span className="orbit-body orbit-body--sm" />
      </div>
    </div>
  );
}
