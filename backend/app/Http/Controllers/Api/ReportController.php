<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    /**
     * Get dashboard statistics (all authenticated users with view_dashboard permission).
     */
    public function dashboard(): JsonResponse
    {
        $totalUsers = User::count();
        $usersByRole = User::with('roles')
            ->get()
            ->flatMap(fn($user) => $user->getRoleNames())
            ->countBy()
            ->toArray();

        return response()->json([
            'stats' => [
                'total_users' => $totalUsers,
                'users_by_role' => $usersByRole,
            ],
        ]);
    }

    /**
     * Get reports data (admin and manager only with view_reports permission).
     */
    public function index(): JsonResponse
    {
        // Sample report data - in production, this would come from real data
        $reports = [
            [
                'id' => 1,
                'title' => 'Monthly User Activity',
                'description' => 'Overview of user activity for the current month',
                'type' => 'activity',
                'created_at' => now()->subDays(1)->toDateTimeString(),
            ],
            [
                'id' => 2,
                'title' => 'System Performance Report',
                'description' => 'System performance metrics and analytics',
                'type' => 'performance',
                'created_at' => now()->subDays(3)->toDateTimeString(),
            ],
            [
                'id' => 3,
                'title' => 'User Registration Trends',
                'description' => 'Analysis of user registration patterns',
                'type' => 'analytics',
                'created_at' => now()->subDays(7)->toDateTimeString(),
            ],
        ];

        // Get user statistics for reports
        $userStats = [
            'total' => User::count(),
            'this_month' => User::whereMonth('created_at', now()->month)->count(),
            'this_week' => User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
        ];

        return response()->json([
            'reports' => $reports,
            'user_stats' => $userStats,
        ]);
    }
}
