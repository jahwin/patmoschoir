import { PricingItem } from "@/types/shared/ICommon";
import React from "react";
interface TicketModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedTicket: number | null;
  setSelectedTicket: (id: number | null) => void;
  numberOfPeople: number;
  setNumberOfPeople: (n: number) => void;
  email: string;
  setEmail: (email: string) => void;
  pricingData: PricingItem[];
  paymentLoading: boolean;
  paymentError: string | null;
  setPaymentError: (e: string | null) => void;
  fetchPaymentWidget: (selectedPricing: PricingItem) => Promise<void>;
}

export default function TicketModal({
  showModal,
  setShowModal,
  selectedTicket,
  setSelectedTicket,
  numberOfPeople,
  setNumberOfPeople,
  email,
  setEmail,
  pricingData,
  paymentLoading,
  paymentError,
  setPaymentError,
  fetchPaymentWidget,
}: TicketModalProps) {
  if (!showModal) return null;

  const selected = pricingData.find(p => p.pricing_id === selectedTicket) || null;

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
      <div style={{background:'#111827', color:'#fff', width:'100%', maxWidth:520, borderRadius:12, padding:16, border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <h3 style={{margin:0, fontSize:18}}>Get Tickets</h3>
          <button onClick={() => setShowModal(false)} style={{background:'transparent', color:'#fff', border:'none', cursor:'pointer'}}>✕</button>
        </div>

        <div style={{display:'grid', gap:10}}>
          <label style={{display:'grid', gap:6}}>
            <span style={{fontSize:12, opacity:0.85}}>Select Ticket</span>
            <select
              value={selectedTicket ?? ''}
              onChange={(e) => setSelectedTicket(e.target.value ? Number(e.target.value) : null)}
              style={{background:'#0b1220', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'10px 12px'}}>
              <option value="">Choose…</option>
              {pricingData.map(p => (
                <option key={p.pricing_id} value={p.pricing_id}>
                  {p.name} — {Number(p.amount).toLocaleString()} {p.currency}
                </option>
              ))}
            </select>
          </label>

          <label style={{display:'grid', gap:6}}>
            <span style={{fontSize:12, opacity:0.85}}>Number of People</span>
            <input type="number" min={1} value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value) || 1)}
              style={{background:'#0b1220', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'10px 12px'}} />
          </label>

          <label style={{display:'grid', gap:6}}>
            <span style={{fontSize:12, opacity:0.85}}>Email (optional)</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{background:'#0b1220', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'10px 12px'}} />
          </label>

          {paymentError && (
            <div style={{color:'#fecaca', background:'#7f1d1d', border:'1px solid rgba(255,255,255,0.08)', padding:'8px 10px', borderRadius:8}}>
              {paymentError}
            </div>
          )}
        </div>

        <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:16}}>
          <button onClick={() => setShowModal(false)}
            style={{background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, padding:'8px 12px', cursor:'pointer'}}>Cancel</button>
          <button
            disabled={!selected || paymentLoading}
            onClick={() => selected && fetchPaymentWidget(selected)}
            style={{background:'#f59e0b', color:'#000', border:'none', borderRadius:8, padding:'8px 12px', cursor:'pointer', opacity:(!selected || paymentLoading)?0.7:1}}>
            {paymentLoading ? 'Processing…' : 'Continue to Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}


