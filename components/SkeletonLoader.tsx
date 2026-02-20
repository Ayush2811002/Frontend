'use client';

export function SkeletonCard() {
  return (
    <div className="glass-effect-dark rounded-2xl p-6 space-y-4">
      <div className="h-10 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-shimmer" />
      <div className="space-y-2">
        <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-3/4 animate-shimmer" />
        <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-1/2 animate-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonActivityItem() {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-2/3 animate-shimmer" />
        <div className="h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-1/3 animate-shimmer" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-1/3 animate-shimmer" />
        <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-2/3 animate-shimmer" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Activity Section */}
      <div className="glass-effect-dark rounded-2xl p-6 space-y-4">
        <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg w-1/3 animate-shimmer" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <SkeletonActivityItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
